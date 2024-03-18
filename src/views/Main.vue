<template>
  <el-container>
    <el-aside :width="asideWidth">
      <CommonAside />
    </el-aside>
    <el-container>
      <el-header>
        <CommonHeader />
      </el-header>
      <el-main>
        <CommonBreadCrumb />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '@/components/CommonAside'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonBreadCrumb from '@/components/CommonBreadCrumb.vue'
export default {
  name: 'Main',
  components: {
    CommonAside,
    CommonHeader,
    CommonBreadCrumb
},
  computed: {
    asideWidth() {
      return this.$store.state.isCollapse ? '48px' : '200px'
    },
  },
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #fff;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  transition: all 0.5s;
}

.el-main {
  background-color: #faf9ff;
  color: #333;
}
</style>
