let state = {
  menu1: [
    {
      path: '/echart',
      icon: 's-marketing',
      txt: '图形数据',
    },
    {
      path: '/user_info',
      icon: 's-custom',
      txt: '员工信息',
    },
    {
      path: '/calendar',
      icon: 'date',
      txt: '考勤打卡',
    },
    {
      path: '/uholiday',
      icon: 'edit',
      txt: '请假审批',
    },
    {
      path: '/uinfo',
      icon: 'user',
      txt: '个人中心',
    },
  ],
  menu2: [
    {
      path: '/echart',
      icon: 's-marketing',
      txt: '图形数据',
    },
    {
      path: '/user_manage',
      icon: 's-custom',
      txt: '员工管理',
    },
    {
      path: '/aholiday',
      icon: 'edit',
      txt: '请假审批',
    },
    {
      path: '/ainfo',
      icon: 'user',
      txt: '个人中心',
    },
  ],
  activePath: '',
  breadName: '',
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  username: '' || localStorage.getItem('username'),
  checkData: [],
  isCollapse: false,
}

export default state
