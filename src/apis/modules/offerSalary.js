export default {
  create: {
    name: 'createSalary',
    method: 'post',
    notify: '薪酬建议创建成功',
    url: '/strict/recruitment/salary/create/'
  },
  edit: {
    name: 'modifySalary',
    method: 'post',
    notify: '薪酬建议修改成功',
    url: '/strict/recruitment/salary/modify/'
  },
  detail: {
    name: 'offerSalaryDetail',
    method: 'get',
    notify: 'none',
    url: '/strict/recruitment/salary/detail/'
  },
  submitApproval: {
    name: 'submitSalaryApproval',
    method: 'post',
    notify: '审批意见提交成功',
    url: '/api/recruitment/offer/salary/approval/'
  },
  mySalaryApproval: {
    name: 'mySalaryApproval',
    method: 'get',
    notify: 'none',
    url: '/strict/recruitment/salary/my_approval/'
  },
  cancel: {
    name: 'cancelSalary',
    method: 'post',
    notify: '薪酬offer撤销成功',
    url: '/api/recruitment/offer/salary/cancel/'
  },
  deleteSalaryReport: {
    name: 'deleteSalaryReport',
    method: 'post',
    notify: '该条薪酬信息删除成功',
    url: '/strict/recruitment/salary/manage/delete/'
  },
  salaryRecordList: {
    name: 'salaryRecordList',
    method: 'get',
    notify: 'none',
    url: '/strict/recruitment/salary/manage/record_list/'
  },
  offerDetail: {
    name: 'offerDetail',
    method: 'get',
    notify: 'none',
    url: '/api/recruitment/application/offer/'
  },
  shareValue: {
    name: 'shareValue',
    method: 'get',
    notify: 'none',
    url: '/strict/recruitment/salary/manage/share/'
  },
  tpRangeList: {
    name: 'tpRangeList',
    method: 'get',
    notify: 'none',
    url: '/strict/recruitment/salary/manage/tp_range/list/'
  }
};
