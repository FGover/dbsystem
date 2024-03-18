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
        <el-col :span="4">
          <span class="upload">导入excel文件</span>
          <input type="file" id="file" @change="importExcel($event)" />
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="exportExcel" style="margin-left: 180px">导出excel文件</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%; margin-top: 10px" border>
        <el-table-column prop="user_id" label="user_id" width="80"></el-table-column>
        <el-table-column prop="username" label="姓名" width="80"></el-table-column>
        <el-table-column prop="gender" label="性别" width="60"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="电话" width="150"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="depart" label="部门" width="100"></el-table-column>
        <el-table-column prop="salary" label="薪资" width="70"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
              <el-button type="primary" size="mini" @click="showEdit(scope.row)">修改</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" size="mini" @click="delUser(scope.row.user_id)">删除</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[5, 8, 10, 12]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </el-card>
    <!-- 修改对话框 -->
    <el-dialog title="修改用户" :visible.sync="dialogEditVisible" width="30%" top="10vh" @close="closeEdit" center>
      <el-form :model="editForm" :rules="ruleForm" ref="editForm" label-width="70px" class="editForm">
        <el-form-item label="部门" prop="depart">
          <el-select v-model="editForm.depart" clearable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="薪资" prop="salary">
          <el-input v-model="editForm.salary" autocomplete="off" clearable type="number"> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'User',
  data() {
    return {
      userList: [],
      // 当前的页数
      pagenum: 1,
      // 当前每页显示数据的最大条数
      pagesize: 5,
      // 总条数
      total: null,
      // 查询
      query: '',
      dialogEditVisible: false,
      ruleForm: {
        depart: [{ required: true, message: '请输入部门', trigger: 'blur' }],
        salary: [{ required: true, message: '请输入薪资', trigger: 'blur' }],
      },
      editForm: {},
      options: [
        {
          value: '研发部',
          label: '研发部',
        },
        {
          value: '财务部',
          label: '财务部',
        },
        {
          value: '后勤部',
          label: '后勤部',
        },
        {
          value: '销售部',
          label: '销售部',
        },
        {
          value: '人事部',
          label: '人事部',
        },
        {
          value: '采购部',
          label: '采购部',
        },
      ],
    }
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      const { data: res } = await this.axios.get('allusers')
      if (res.status !== 401) {
        this.userList = res.slice((this.pagenum - 1) * this.pagesize, this.pagenum * this.pagesize)
        this.total = res.length
      }
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
        const { data: res } = await this.axios.get('getbynameid', {
          params: {
            user_id: this.query,
            username: this.query,
          },
        })
        if (res.status !== 401) {
          this.userList = res
          this.userList = res.slice((this.pagenum - 1) * this.pagesize, this.pagenum * this.pagesize)
          this.total = res.length
        }
      } else {
        this.$message.warning('请输入要搜索的id或name')
      }
    },

    // 导入excel
    importExcel(e) {
      let excelData = []
      const files = e.target.files[0]
      let index = files.name.indexOf('.')
      let str = files.name.substring(index)
      if (str !== '.xlsx' && str !== '.xls') {
        this.$message.error('文件格式不正确')
        return
      }
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(files)
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const wsname = workbook.SheetNames[0]
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
          excelData = ws.map((item) => {
            let res = {}
            res.username = item.姓名
            res.gender = item.性别
            res.email = item.邮箱
            res.phone = item.电话
            res.address = item.地址
            res.depart = item.部门
            res.salary = item.薪资
            return res
          })
          if (excelData.length > 0) {
            excelData.forEach((item) => {
              this.axios.post('importexcel', {
                params: item,
              })
            })
            this.$message.success('导入成功')
            this.getUserList()
          } else {
            this.$message.error('导入失败')
          }
        } catch (e) {
          return false
        }
      }
    },

    //导出excel
    async exportExcel() {
      const { data: res } = await this.axios.get('allusers')
      const data = this.formData(res)
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(data)
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
      XLSX.writeFile(wb, '员工信息表.xlsx')
      this.$message.success('导出成功')
    },
    // 格式化数据
    formData(data) {
      return data.map((item) => {
        const { username, gender, email, phone, address, depart, salary } = item
        return { 姓名: username, 性别: gender, 邮箱: email, 电话: phone, 地址: address, 部门: depart, 薪资: salary }
      })
    },
    // 删除用户
    async delUser(id) {
      // 弹框询问
      const result = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      // 如果用户确认删除 则返回值为confirm
      // 如果用户取消删除 则返回值为cancel
      if (result !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.axios.delete('deluser', {
        params: {
          user_id: id,
        },
      })
      if (res.status === 200) {
        // 当删除最后一条记录 防止当前页数据为空
        let totalPage = Math.ceil((this.total - 1) / this.pagesize)
        let currentPage = this.pagenum > totalPage ? totalPage : this.pagenum
        this.pagenum = currentPage < 1 ? 1 : currentPage
        this.$message.success(res.message)
        this.getUserList()
      } else {
        this.$message.error('删除失败')
      }
    },
    showEdit(row) {
      this.dialogEditVisible = true
      this.editForm = row
    },
    closeEdit() {
      this.getUserList()
    },
    // 修改用户
    async updateUser() {
      const { data: res } = await this.axios.post('updateuserwork', {
        params: {
          salary: this.editForm.salary,
          depart: this.editForm.depart,
          id: this.editForm.id,
        },
      })
      if (res.status === 200) {
        this.$message.success(res.message)
        this.getUserList()
      } else {
        this.$message.error('修改失败')
      }
      this.dialogEditVisible = false
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
.editForm {
  height: 200px;
}

.upload {
  width: 130px;
  height: 40px;
  color: #fff;
  font-size: 15px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 5%;
  background-color: #409eff;
}

#file {
  width: 100px;
  height: 40px;
  position: absolute;
  z-index: 100;
  opacity: 0;
  filter: alpha(opacity=0);
  margin-left: 30px;
  margin-top: 5px;
}
</style>
