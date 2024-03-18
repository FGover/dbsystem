<template>
  <div class="user">
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 搜索栏 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input clearable placeholder="请输入内容" v-model="query" @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%; margin-top: 10px" border>
        <el-table-column prop="user_id" label="user_id" width="80"></el-table-column>
        <el-table-column prop="username" label="姓名" width="80"></el-table-column>
        <el-table-column prop="gender" label="性别" width="60"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="depart" label="部门"></el-table-column>
        <el-table-column prop="salary" label="薪资"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[5, 8, 10]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      userList: [],
      // 当前的页数
      pagenum: 1,
      // 当前每页显示数据的最大条数
      pagesize: 5,
      // 总条数
      total: 0,
      // 查询
      query: '',
    }
  },
  methods: {
    // 获取员工信息
    async getUserList() {
      const { data: res } = await this.axios.get('allusers')
      this.userList = res.slice((this.pagenum - 1) * this.pagesize, this.pagenum * this.pagesize)
      this.total = res.length
    },
    // 监听pageSize
    handleSizeChange(newSize) {
      this.pagesize = newSize
      this.pagenum = 1
      if (this.query) {
        this.search()
      } else {
        this.getUserList()
      }
    },
    // 监听页码值
    handleCurrentChange(newPage) {
      this.pagenum = newPage
      if (this.query) {
        this.search()
      } else {
        this.getUserList()
      }
    },
    // 搜索
    async search() {
      if (this.query) {
        if (!isNaN(this.query)) {
          const { data: res } = await this.axios.get('searchbyid', {
            params: {
              id: this.query,
            },
          })
          if (res.status !== 401) {
            this.userList = res
            this.userList = res.slice((this.pagenum - 1) * this.pagesize, this.pagenum * this.pagesize)
            this.total = res.length
          }
        } else {
          const { data: res } = await this.axios.get('searchbyname', {
            params: {
              username: '%' + this.query + '%',
            },
          })
          if (res.status !== 401) {
            this.userList = res
            this.userList = res.slice((this.pagenum - 1) * this.pagesize, this.pagenum * this.pagesize)
            this.total = res.length
          }
        }
      } else {
        this.$message.warning('请输入要搜索的id或name')
      }
    },
  },
  mounted() {
    this.getUserList()
  },
}
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 10px;
}
.editForm,
.addForm {
  height: 400px;
}
</style>
