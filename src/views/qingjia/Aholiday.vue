<template>
  <div class="uinfo">
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="id" width="60"></el-table-column>
        <el-table-column prop="username" label="用户名" width="100"></el-table-column>
        <el-table-column prop="time" label="休假时间"></el-table-column>
        <el-table-column prop="timeLong" label="休假时长" width="100"></el-table-column>
        <el-table-column prop="reason" label="休假原因" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="status" label="审核状态" width="180"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showTxt(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 查看请假条弹框 -->
    <el-dialog title="请假条" :visible.sync="dialogTableVisible" top="10vh" center>
      <el-steps :active="2" align-center>
        <el-step title="提交申请"></el-step>
        <el-step title="审批中"></el-step>
        <el-step title="审批完成"></el-step>
      </el-steps>
      <div class="txt">
        <div class="t">请假人：{{ txt.username }}</div>
        <div class="t">请假时长：{{ txt.timeLong }}</div>
        <div class="t">请假原因：{{ txt.reason }}</div>
      </div>
      <el-button class="btn1" type="danger" @click="disapproval">不同意</el-button>
      <el-button class="btn2" type="success" @click="approval">同意</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Aholiday',
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      txt: {},
    }
  },
  mounted() {
    this.getLeave()
  },
  methods: {
    async getLeave() {
      const { data: res } = await this.axios.get('approvalinfo')
      console.log(res)
      res.forEach((item) => {
        item.start_time = this.initTime(item.start_time)
        item.end_time = this.initTime(item.end_time)
        item.time = item.start_time + ' - ' + item.end_time
        const diff = new Date(item.end_time).getTime() - new Date(item.start_time).getTime()
        if (new Date(item.end_time).getTime() - new Date(item.start_time).getTime() < 1000 * 3600 * 24) {
          item.timeLong = '半天'
        } else {
          const days = Math.floor(diff / (1000 * 3600 * 24))
          item.timeLong = days + '天'
        }
      })
      this.tableData = res
    },
    // 格式化时间
    initTime(time) {
      const date = new Date(time)
      const newDate = new Date(date.getTime() + 8 * 60 * 60 * 1000)
      const newDateStr = newDate
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.000Z$/, '')
      return newDateStr
    },
    showTxt(data) {
      this.dialogTableVisible = true
      this.txt.username = data.username
      this.txt.reason = data.reason
      this.txt.timeLong = data.timeLong
      this.txt.id = data.id
    },
    async disapproval() {
      const { data: res } = await this.axios.post('disapproval', {
        params: {
          admin_id: localStorage.getItem('admin_id'),
          admin_name: localStorage.getItem('adminname'),
          id: this.txt.id,
        },
      })
      if (res.status === 200) {
        this.$message.success(res.message)
        this.dialogTableVisible = false
        this.getLeave()
      }
    },
    async approval() {
      const { data: res } = await this.axios.post('approval', {
        params: {
          admin_id: localStorage.getItem('admin_id'),
          admin_name: localStorage.getItem('adminname'),
          id: this.txt.id,
        },
      })
      if (res.status === 200) {
        this.$message.success(res.message)
        this.dialogTableVisible = false
        this.getLeave()
      }
    },
  },
}
</script>

<style scoped>
.el-card {
  margin-top: 20px;
}
.txt {
  margin-left: 100px;
  margin-top: 30px;
  font-size: 16x;
  font-weight: bold;
}
.t {
  margin-bottom: 20px;
}
.btn1 {
  margin-left: 300px;
}
.btn2 {
  margin-right: 100px;
}
</style>
