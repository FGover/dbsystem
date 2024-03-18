<template>
  <div class="head">
    <div class="head-left">
      <el-button @click="handleMenu" icon="el-icon-menu" size="mini" plain></el-button>
      <h3 style="margin-left: 10px">员工管理系统</h3>
    </div>
    <div class="head-right">
      <div style="user-select: none">{{ txt }} ❤</div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img :src="url" alt="" width="45" height="45" style="border-radius: 50%" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="b">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommandHeader',
  data() {
    return {
      txt: '别熬夜早点睡',
      url: '',
    }
  },
  mounted() {
    this.getTime()
    this.getAvatar()
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    },
    handleCommand(command) {
      if (command === 'b') {
        this.$store.commit('removeToken')
        this.$router.push('/login')
        this.$message.success('退出登录成功')
        localStorage.clear()
      }
    },
    async getAvatar() {
      if (localStorage.getItem('radio') === '2') {
        const { data: res } = await this.axios.get('admininfo', {
          params: {
            adminname: localStorage.getItem('username'),
          },
        })
        if (res[0].avatar) {
          this.url = require('../../server/public' + res[0].avatar)
        } else {
          this.url = require('../../server/public/upload/fg.jpg')
        }
      } else if (localStorage.getItem('radio') === '1') {
        const { data: res } = await this.axios.get('userinfo', {
          params: {
            username: localStorage.getItem('username'),
          },
        })
        if (res[0].avatar) {
          this.url = require('../../server/public' + res[0].avatar)
        } else {
          this.url = require('../../server/public/upload/fg.jpg')
        }
      }
    },
    getTime() {
      let time = new Date()
      let hour = time.getHours()
      if (hour >= 6 && hour <= 11) {
        this.txt = '早上好'
      }
      if (hour > 11 && hour <= 13) {
        this.txt = '中午好'
      }
      if (hour > 13 && hour <= 18) {
        this.txt = '下午好'
      }
      if (hour > 18 && hour <= 24) {
        this.txt = '晚上好'
      }
    },
  },
}
</script>

<style lang="less" scoped>
.head {
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .head-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .head-right {
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
}
</style>
