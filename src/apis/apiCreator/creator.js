import utils from '@/utils';
import axiosComponent from './axiosComponent';
import resources from './resources';
import getGlobalCache from './caches';

const { prop } = utils;

const globalCache = getGlobalCache();

const baseAPI = resources;

const equivalent = e => e;

const makeFetchAPI = (option) => {
  if (!option) {
    return Promise.reject(new Error('api not found'));
  }
  if (option.global && option.id in globalCache) {
    return globalCache[option.id];
  }

  const {
    method = 'get',
    url = '',
    useCache = false,
    serialize = equivalent,
    deserialize = equivalent,
    ...rest
  } = option;
  let cache = null;
  let apiFn = null;

  if (useCache) {
    apiFn = (...args) => {
      if (cache) {
        return Promise.resolve(cache);
      }

      const data = serialize(...args);
      if (data === false) {
        return Promise.resolve(null);
      }

      return axiosComponent[method === 'post' ? 'submit' : 'get'](Object.assign(rest, {
        url,
        data
      })).then((res) => {
        return cache = deserialize(res);
      });
    };
  } else {
    apiFn = (...args) => {
      const data = serialize(...args);
      if (data === false) {
        return Promise.resolve(null);
      }

      return axiosComponent[method === 'post' ? 'submit' : 'get'](Object.assign(rest, {
        url,
        data
      })).then((res) => {
        return deserialize(res);
      });
    };
  }

  if (option.global) {
    globalCache[option.id] = apiFn;
  }

  return apiFn;
};

const getOption = (rule) => {
  if (!rule) {
    console.error('api rule must not be null');
    return;
  }

  if (typeof rule === 'string') {
    rule = {
      id: rule,
      global: true
    };
  }
  const id = rule.id;
  let api = prop(baseAPI, id);
  if (!api) {
    console.error(`api with this '${rule.id}' id is not found`);
    api = rule;
  }
  if (rule.global || api.global) {
    return Object.assign({}, api, rule, { id });
  }

  const { serialize, deserialize, ...rest } = rule;
  const { serialize: cacheSeFn = equivalent, deserialize: cacheDeFn = equivalent } = api;
  if (serialize) {
    api.serialize = (...args) => {
      const res = cacheSeFn(...args);
      return serialize(...args, res);
    };
  }
  if (deserialize) {
    api.deserialize = (res) => {
      const deserializedRes = cacheDeFn(res);
      return deserialize(res, deserializedRes);
    };
  }

  return Object.assign({}, api, rest, { id });
};


const enhanceFnStaticProp = (fn, props) => {
  const rst = fn(props);
  rst.props = { ...props };
  return rst;
};

export const getAPI = rule => enhanceFnStaticProp(makeFetchAPI, getOption(rule));

export const getAPIs = (rules) => {
  const res = {};
  rules = [].concat(rules);
  rules.map(getOption).forEach((option) => {
    if (!option) {
      return;
    }

    const { id, short } = option;
    // id
    if (res[id]) {
      console.warn(`API id conflict: ${id}.`);
    }

    const makeFetch = enhanceFnStaticProp(makeFetchAPI, option);
    res[id] = makeFetch;

    // short hand id
    if (short != null) {
      if (res[short] && short !== id) {
        console.warn(`API short hand name conflict: ${short}.`);
      }
      res[short] = makeFetch;
    }
  });
  return res;
};
