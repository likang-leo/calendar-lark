export default {
  listHeader: {
    submit: {
      name: 'submit',
      method: 'post',
      notify: '授权结果提交成功',
      url: '/strict/internal/v2/advance/submit/'
    },
    processInfo: {
      name: 'processInfo',
      method: 'get',
      notify: 'none',
      url: '/strict/internal/v2/advance/process/info/'
    },
    delete: {
      name: 'delete',
      method: 'post',
      notify: 'none',
      url: '/strict/internal/v2/advance/process/delete/'
    },
    approve: {
      name: 'submit',
      method: 'post',
      notify: '审批成功',
      url: '/strict/internal/v2/advance/process/approve/'
    }
  },
  grant: {
    create: {
      name: 'create',
      method: 'post',
      notify: '授权新建成功',
      url: '/strict/internal/v2/advance/grant/create/'
    },
    edit: {
      name: 'edit',
      method: 'post',
      notify: '授权编辑成功',
      url: '/strict/internal/v2/advance/grant/modify/'
    },
    cancel: {
      name: 'cancel',
      method: 'post',
      notify: '本条授权删除成功',
      url: '/strict/internal/v2/advance/grant/delete/'
    },
    list: {
      name: 'grantList',
      method: 'get',
      notify: 'none',
      url: '/strict/internal/v2/advance/grant_tree/'
    },
    scopeCheck: {
      name: 'scopeCheck',
      method: 'post',
      notify: 'none',
      url: '/strict/internal/v2/advance/grant/scope/check/'
    }
  },
  adjustTable: {
    list: {
      name: 'adjustTableList',
      method: 'get',
      notify: 'none',
      url: '/strict/internal/v2/advance/root_list/'
    },
    adjust: {
      name: 'adjust',
      method: 'post',
      notify: '调级调薪成功',
      url: '/strict/advance/adjust/'
    }
  },
  log: {
    list: {
      name: 'logList',
      method: 'get',
      notify: 'none',
      url: '/strict/internal/v2/advance/process/log/'
    }
  },
  enter: {
    firstEnterCheck: {
      name: 'firstEnterCheck',
      method: 'get',
      notify: 'none',
      url: '/strict/internal/v2/advance/first_visit_check/'
    },
    firstVisit: {
      name: 'firstVisit',
      method: 'post',
      notify: 'none',
      url: '/strict/internal/v2/advance/first_visit/'
    }
  },
  process: {
    info: {
      name: 'info',
      method: 'get',
      notify: 'none',
      url: '/strict/internal/v2/advance/process/info/'
    },
    create: {
      name: 'create',
      method: 'post',
      notify: 'none',
      url: '/strict/internal/v2/advance/process/create/'
    },
    modify: {
      name: 'modify',
      method: 'post',
      notify: 'none',
      url: '/strict/internal/v2/advance/process/modify/'
    },
    scopeCheck: {
      name: 'check',
      method: 'post',
      notify: 'none',
      url: '/strict/internal/v2/advance/process/scope/check/'
    }
  },
  formula: {
    config: {
      name: 'config',
      method: 'get',
      notify: 'none',
      url: '/strict/internal/v1/compensation/formula/config/'
    }
  }
};
