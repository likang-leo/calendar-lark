import axios from 'axios';
import { notification, message, Modal } from 'antd';
import Data from 'data_js';
import { intlFormatMessage } from '@/lang';

const { confirm } = Modal;
const { location } = window;

const notificationError = (msg, duration = 6) => {
  notification.error({
    message: intlFormatMessage('People.mixins.errorHint'),
    description: msg,
    duration
  });
};

const axiosComponent = {
  getInitialState() {
    return {
      loading: false,
      host: ''
    };
  },

  formatParams(config) {
    if (!config.data) return;
    Object.entries(config.data).forEach(([key, value]) => {
      if (value === '' || value === undefined) {
        delete config.data[key];
      }
    });
  },

  makeFormData(config) {
    if (!config.data) return;
    const formData = new FormData();
    Object.entries(config.data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  },

  get(config, verbose = false) {
    const self = this;
    if (!verbose) {
      self.formatParams(config);
    }
    return axios({
      url: config.url,
      method: 'get',
      params: config.data,
      responseType: 'json',
      withCredentials: true
    })
      .then(({ data }) => {
        if (data.success) {
          Data.set('loaded', true);
          return data;
        }

        return this.handleFail(data, config);
      })
      .catch((err) => {
        Data.set('loaded', true);
        return self.handleError(err, config);
      });
  },

  submit(config, verbose = false) {
    const self = this;
    if (!verbose) {
      self.formatParams(config);
    }
    const formData = self.makeFormData(config);
    if (config.beforeSend) {
      config.beforeSend();
    }

    const reqConfigs = {
      url: config.url,
      responseType: 'json',
      method: 'post',
      data: formData,
      notify: config.notify,
      withCredentials: true
    };

    if (/json/.test(config.contentType)) {
      reqConfigs.contentType = 'application/json';
      reqConfigs.data = JSON.stringify(reqConfigs.data);
    }

    return axios(reqConfigs)
      .then(({ data }) => {
        if (data.success) {
          if (config.notify !== 'none') {
            message.success(config.notify || intlFormatMessage('People.mixins.dataSaved'));
          }

          Data.set('loaded', true);
          return data;
        }

        return this.handleFail(data, config);
      })
      .catch(err => self.handleError(err, config));
  },

  handleError(errorResponse, config) {
    console.error(errorResponse);
    Data.set('loaded', true);
    notificationError(intlFormatMessage('People.mixins.networkFailure'));
    return Promise.reject(errorResponse);
  },

  handleFail(data, config) {
    let msg;
    let nextUrl;
    let currentUrl;

    // send no notification when success is false
    const { muteOnFail = false } = config;
    // 校验是否为登录
    if (data.next) {
      nextUrl = 'http://sso.bytedance-inc.org/next.html?url=';
      currentUrl = location.href;
      location.href = nextUrl + currentUrl;
    }

    // 校验是否有出错提示
    if (data.msg) {
      msg = data.msg;
    }

    // 校验是否为字段验证出错
    if (data.errors) {
      let errorList;
      const errors = data.errors;

      if (errors.length > 0 && config.warnings) {
        errorList = [];
        errors.forEach((item) => {
          let tips;
          if (config.warnings[item]) {
            tips = config.warnings[item];
          } else {
            tips = item;
          }
          errorList.push(tips);
        });
      } else {
        errorList = data.errors;
      }
      msg = intlFormatMessage('People.mixins.checkField') + errorList.toString();
    }

    if (!data.next && msg && !muteOnFail) {
      notificationError(msg);
    }

    return data;
  }
};

axiosComponent.post = axiosComponent.submit;

export default axiosComponent;
