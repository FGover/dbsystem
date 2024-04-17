<template>
  <div class="register">
    <div class="info">
      <h3>Sign up</h3>
      <div class="img">
        <img src="@/assets/可莉.png" alt="" />
      </div>
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="80px" class="demo-userForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" style="width: 100%" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userForm.password" show-password style="width: 100%" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPass">
          <el-input type="password" v-model="userForm.confirmPass" show-password style="width: 100%" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="radio" class="radio" label="1">员工</el-radio>
          <el-radio v-model="radio" class="radio" label="2">管理员</el-radio>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="btn" @click="register">注册</el-button>
      <div class="txt" @click="toLogin">已有账号？前往登录</div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userForm: {
        username: '',
        password: '',
        confirmPass: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 9, message: '长度在 4 到 9 个字符', trigger: 'blur' },
        ],
        confirmPass: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 4, max: 9, message: '长度在 4 到 9 个字符', trigger: 'blur' },
        ],
      },
      radio: '1',
    }
  },
  methods: {
    register() {
      if (this.radio == 1) {
        this.$refs.userForm.validate(async (valid) => {
          if (valid) {
            const { data: res } = await this.axios.post('user/register', {
              params: {
                username: this.userForm.username,
                password: this.userForm.password,
              },
            })
            if (res.status == 200) {
              this.$router.push('/login')
              this.$message.success(res.message)
            } else if (res.status == 202) {
              this.$message.error(res.message)
            } else {
              this.$message.error(res.message)
            }
          }
        })
      } else {
        this.$refs.userForm.validate(async (valid) => {
          if (valid) {
            const { data: res } = await this.axios.post('admin/register', {
              params: {
                adminname: this.userForm.username,
                adminpassword: this.userForm.password,
              },
            })
            if (res.status == 200) {
              this.$router.push('/login')
              this.$message.success(res.message)
            } else if (res.status == 202) {
              this.$message.error(res.message)
            } else {
              this.$message.error(res.message)
            }
          }
        })
      }
    },
    toLogin() {
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="less" scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #e6a49d, #fff);
  .info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 500px;
    backdrop-filter: blur(10px);
    box-shadow: 2px 1px 20px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      margin-top: 20px;
      text-align: center;
      font-size: 26px;
      color: #fff;
      user-select: none;
    }
    .img {
      margin-top: 20px;
      width: 70px;
      height: 70px;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .radio {
      color: #fff;
    }
    .demo-userForm {
      margin: 30px auto;
    }

    ::v-deep(.el-radio__input.is-checked + .el-radio__label) {
      color: #ebb5af !important;
    }
    ::v-deep(.el-radio__input.is-checked .el-radio__inner) {
      background: #ebb5af !important;
      border-color: #ebb5af !important;
    }
    ::v-deep(.el-input__inner) {
      border-radius: 8px;
    }
    ::v-deep(.el-input__inner:focus) {
      border-color: #ebb5af !important;
    }
    .btn {
      position: absolute;
      top: 85%;
      left: 44%;
      width: 80px;
      transform: translate(-50%, -50%);
      background-color: #c08f8a;
      border: #c08f8a;
    }
    .txt {
      font-size: 12px;
      position: absolute;
      top: 85%;
      left: 70%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      user-select: none;
      color: #fff;
    }
  }
}
</style>
