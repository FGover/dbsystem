let mutations = {
  setActivePath(state) {
    state.activePath = localStorage.getItem('activePath')
  },
  saveNavState(state, path) {
    localStorage.setItem('activePath', path)
    state.activePath = path
  },
  // 保存token
  setToken(state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  removeToken(state) {
    state.token = ''
    localStorage.removeItem('token')
    localStorage.removeItem('activePath')
  },

  // 保存用户名
  saveUser(state, username) {
    state.username = username
    localStorage.setItem('username', state.username)
  },

  // 保存checkData
  saveCheckData(state, checkData) {
    state.checkData = checkData
    localStorage.setItem('checkData', JSON.stringify(state.checkData))
  },
  collapseMenu(state) {
    state.isCollapse = !state.isCollapse
  },
  setBreadcrumb(state, breadName) {
    // 接收传来的breadName
    state.breadName = breadName
    localStorage.setItem('breadName', breadName)
  },
  getBreadcrumb(state) {
    state.breadName = localStorage.getItem('breadName')
  }
}

export default mutations
