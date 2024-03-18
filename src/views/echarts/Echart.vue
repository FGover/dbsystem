<template>
  <div class="echart">
    <el-card style="margin-top: 20px">
      <EChart1 />
    </el-card>
    <el-card style="margin-top: 5px">
      <div class="pie">
        <EChart2 />
        <EChart3 />
      </div>
    </el-card>
  </div>
</template>

<script>
import EChart1 from '@/components/Echart1.vue'
import EChart2 from '@/components/Echart2.vue'
import EChart3 from '@/components/Echart3.vue'
export default {
  name: 'Echart',
  components: {
    EChart1,
    EChart2,
    EChart3
  },
  data() {
    return {
      userNum: '',
      adminNum: '',
    }
  },
  mounted() {
    this.getUser()
    this.getAdmin()
  },
  methods: {
    async getUser() {
      const { data: res } = await this.axios.get('user')
      this.userNum = res.length
    },
    async getAdmin() {
      const { data: res } = await this.axios.get('admin')
      this.adminNum = res.length
    },
  },
}
</script>

<style scoped>
.el-card {
  height: 280px;
}
.pie {
  width: 100%;
  display: flex;
}
</style>
