<template>
  <div class="uinfo">
    <el-button type="primary" style="margin: 20px 0 0 30px" @click="showForm">请假申请</el-button>
    <el-card>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="id" label="id" width="60"></el-table-column>
        <el-table-column prop="time" label="休假时间"></el-table-column>
        <el-table-column prop="timeLong" label="休假时长" width="100"></el-table-column>
        <el-table-column prop="reason" label="休假原因" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="status" label="审核状态" width="180">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.flag1" type="success">{{ scope.row.status }}</el-tag>
            <el-tag v-if="scope.row.flag2" type="danger">{{ scope.row.status }}</el-tag>
            <el-tag v-if="scope.row.flag3">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showTxt(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[5, 8, 10]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-card>
    <el-dialog title="请假申请" :visible.sync="dialogEditVisible" width="40%" top="10vh" @close="close" center>
      <el-form :model="form" :rules="ruleForm" ref="form" label-width="70px" class="form">
        <el-form-item label="时间" prop="time">
          <el-date-picker :picker-options="pickerOptions" v-model="form.time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="原因" prop="reason">
          <el-input v-model="form.reason" autocomplete="off" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看请假条弹框 -->
    <el-dialog title="请假条" :visible.sync="dialogTableVisible" @close="closeTxt" top="10vh" center>
      <el-steps :active="active" align-center>
        <el-step title="提交申请"></el-step>
        <el-step title="审批中"></el-step>
        <el-step title="审批完成"></el-step>
      </el-steps>
      <div class="txt">
        <div class="t">请假人：{{ username }}</div>
        <div class="t">请假时长：{{ txt.timeLong }}</div>
        <div class="t">请假原因：{{ txt.reason }}</div>
        <div class="t">审批人：{{ txt.admin_name }}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Uholiday',
  data() {
    return {
      tableData: [],
      // 当前的页数
      pagenum: 1,
      // 当前每页显示数据的最大条数
      pagesize: 5,
      // 总条数
      total: 0,
      dialogEditVisible: false,
      dialogTableVisible: false,
      form: {},
      ruleForm: {
        time: { required: true, message: '请选择时间', trigger: 'blur' },
        reason: { required: true, message: '请说明原因', trigger: 'blur' },
      },
      // 禁用选择器过去的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date().getTime() - 86400000
        },
      },
      txt: {},
      active: 1,
    }
  },
  computed: {
    username() {
      return localStorage.getItem('username')
    },
  },
  mounted() {
    this.getLeave()
  },
  methods: {
    async getLeave() {
      const { data: res } = await this.axios.get('getleave', {
        params: {
          user_id: localStorage.getItem('user_id'),
        },
      })
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
        if (item.status === '审批通过') {
          item.flag1 = true
        } else if (item.status === '审批拒绝') {
          item.flag2 = true
        } else if (item.status === '待审批') {
          item.flag3 = true
        }
      })
      this.tableData = res.slice((this.pagenum - 1) * this.pagesize, this.pagenum * this.pagesize)
      this.total = res.length
    },
    showForm() {
      this.dialogEditVisible = true
    },
    close() {
      this.getLeave()
      this.$refs.form.resetFields()
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
    // 提交申请
    submitForm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          console.log(this.form)
          const start_time = this.initTime(this.form.time[0].toString())
          const end_time = this.initTime(this.form.time[1].toString())
          console.log(start_time, end_time)
          const { data: res } = await this.axios.post('submit', {
            params: {
              user_id: localStorage.getItem('user_id'),
              reason: this.form.reason,
              start_time: start_time,
              end_time: end_time,
            },
          })
          if (res.status === 200) {
            this.$message.success(res.message)
            this.dialogEditVisible = false
            this.getLeave()
          }
        }
      })
    },
    showTxt(data) {
      this.dialogTableVisible = true
      this.txt.reason = data.reason
      this.txt.timeLong = data.timeLong
      this.txt.admin_name = data.admin_name
      if (data.status === '审批通过' || data.status === '审批拒绝') {
        this.active = 3
      }
    },
    closeTxt() {
      this.active = 1
    },
    // 监听pageSize
    handleSizeChange(newSize) {
      this.pagesize = newSize
      this.pagenum = 1
      this.getLeave()
    },
    // 监听页码值
    handleCurrentChange(newPage) {
      this.pagenum = newPage
      this.getLeave()
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
</style>
