<template>
  <el-menu :default-active="activePath ? activePath : '/echart'" class="el-menu-vertical-demo" router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <div class="icon">CCY</div>
    <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path" @click="saveNavState(item.path)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.txt }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CommonAside',
  computed: {
    // 第一种写法：
    // menu() {
    //   return this.$store.state.menu
    // },
    // 第二种写法
    // ...mapState(['menu']),
    // 第三种写法
    ...mapState({
      menuList: (state) => {
        if (localStorage.getItem('radio') === '1') {
          return state.menu1
        } else if (localStorage.getItem('radio') === '2') {
          return state.menu2
        }
      },
      activePath: (state) => state.activePath,
    }),
  },
  mounted() {
    this.$store.commit('setActivePath')
  },
  methods: {
    saveNavState(path) {
      this.$store.commit('saveNavState', path)
    },
  },
}
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
  border: none;
  .icon {
    text-align: center;
    line-height: 50px;
    color: #fff;
  }
  // .el-menu-vertical-demo:not(.el-menu--collapse) {
    // width: 200px;
    // min-height: 400px;
  // }
}
</style>
