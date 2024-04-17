<template>
  <div class="Calendar">
    <div class="com">
      <CheckDay @data-change="handleDataFromChild" />
      <CheckEchart :checkData="num" />
    </div>
  </div>
</template>

<script>
import CheckDay from '@/components/checkDay.vue'
import CheckEchart from '@/components/checkEchart.vue'
export default {
  name: 'Calendar',
  components: { CheckDay, CheckEchart },
  data() {
    return {
      num: [],
    }
  },
  created() {
    this.year = this.getCurrentYear()
    this.month = this.getCurrentMonth()
    this.day = this.getCurrentDay()
    this.getMonthDay()
    this.getAll()
  },
  mounted() {},
  methods: {
    handleDataFromChild(data) {
      this.num = data
    },
    getMonthDay() {
      let date = new Date(this.year, this.month, 0)
      this.num = date.getDate()
      let arr = []
      // 给arr数组增加对象 且对象属性名为day和isChecked
      for (let i = 0; i < this.num; i++) {
        arr.push({ day: i + 1, isChecked: false, checked: false, checkout: false })
      }
      if (this.month === this.getCurrentMonth()) {
        let index = this.day - 1
        arr[index].isChecked = true
      }
      this.num = arr
    },
    async getAll() {
      const { data: res } = await this.axios.get('check_list', {
        params: {
          user_id: localStorage.getItem('user_id'),
        },
      })
      const checkList = res
      let arr = []
      let arr2 = []
      for (let i = 0; i < checkList.length; i++) {
        const dateStr = checkList[i].sign_in_time
        const dateStr2 = checkList[i].sign_out_time
        const date = new Date(dateStr)
        const date2 = new Date(dateStr2)
        arr.push({ day: date.getDate(), month: date.getMonth() + 1 })
        arr2.push({ day: date2.getDate(), month: date2.getMonth() + 1 })
      }
      for (let i = 0; i < checkList.length; i++) {
        if (this.month === arr[i].month) {
          this.num[arr[i].day - 1].checked = true
        }
        if (this.month === arr2[i].month) {
          this.num[arr2[i].day - 1].checkout = true
        }
      }
      console.log(this.num)
    },
    getCurrentMonth() {
      let date = new Date()
      return date.getMonth() + 1
    },
    // 获取当前年份
    getCurrentYear() {
      let date = new Date()
      return date.getFullYear()
    },
    // 获取当前月份
    getCurrentMonth() {
      let date = new Date()
      return date.getMonth() + 1
    },
    // 获取当前是几号
    getCurrentDay() {
      let date = new Date()
      return date.getDate()
    },
  },
}
</script>

<style lang="less" scoped>
.com {
  display: flex;
  margin-top: 20px;
}
</style>
