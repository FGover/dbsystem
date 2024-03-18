<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/echart' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ breadName }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {}
  },
  computed: {
    breadName() {
      return this.$store.state.breadName
    },
  },
  watch: {
    // 监听路由变化
    $route: {
      handler: function (newVal) {
        let path = newVal.path
        this.$store.commit('saveNavState', path)
        if (path.indexOf('/echart') !== -1) {
          this.$store.commit('setBreadcrumb', '图形数据')
        } else if (path.indexOf('/user_info') !== -1) {
          this.$store.commit('setBreadcrumb', '员工信息')
        } else if (path.indexOf('/calendar') !== -1) {
          this.$store.commit('setBreadcrumb', '考勤打卡')
        } else if (path.indexOf('/uholiday') !== -1) {
          this.$store.commit('setBreadcrumb', '请假审批')
        } else if (path.indexOf('/uinfo') !== -1 || path.indexOf('/ainfo') !== -1) {
          this.$store.commit('setBreadcrumb', '个人中心')
        } else if (path.indexOf('/user_manage') !== -1) {
          this.$store.commit('setBreadcrumb', '员工管理')
        } else if(path.indexOf('/aholiday') !== -1){
          this.$store.commit('setBreadcrumb', '请假审批')
        }
      },
    },
  },
  mounted() {
    this.$store.commit('getBreadcrumb')
  }
}
</script>
