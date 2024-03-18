<template>
  <div class="checkday">
    <h4 class="head-title">每日打卡</h4>
    <div class="head">
      <div class="head-left" @click="lastMonth">&lt;&lt;&lt; 上一月</div>
      <div class="head-mid">{{ year }} 年 {{ month }} 月</div>
      <div class="head-right" @click="nextMonth">下一月 >>></div>
    </div>
    <div class="day">
      <div v-for="(item, index) in days" :key="index" class="day-item">{{ item }}</div>
    </div>
    <div class="num">
      <div v-if="one" class="num-item"></div>
      <div v-if="two" class="num-item"></div>
      <div v-if="three" class="num-item"></div>
      <div v-if="four" class="num-item"></div>
      <div v-if="five" class="num-item"></div>
      <div v-if="six" class="num-item"></div>
      <div v-if="seven" class="num-item"></div>
      <div v-for="(item, index) in num" :key="index" class="num-item">
        <div :class="item.isChecked ? 'active' : ''">{{ item.day }}</div>
        <div v-if="item.checked" class="txt" style="color: #2ba245">已签</div>
        <div v-if="!item.checked" class="txt" style="color: red">未签</div>
      </div>
    </div>
    <div class="btn" @click="check">签到</div>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
export default {
  name: 'checkDay',
  data() {
    return {
      days: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      num: [],
      year: '',
      month: '',
      day: '',
      firstDayWeek: '',
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
      six: false,
      seven: false,
      checkList: [],
    }
  },
  created() {
    this.year = this.getCurrentYear()
    this.month = this.getCurrentMonth()
    this.day = this.getCurrentDay()
    this.getMonthDays()
    this.getFirstDayOfWeek(this.year, this.month)
    this.getAllCheck()
  },
  mounted() {},
  methods: {
    // 获取一年中每个月的天数
    getMonthDays() {
      let date = new Date(this.year, this.month, 0)
      this.num = date.getDate()
      let arr = []
      // 给arr数组增加对象 且对象属性名为day和isChecked
      for (let i = 0; i < this.num; i++) {
        arr.push({ day: i + 1, isChecked: false, checked: false })
      }
      if (this.month === this.getCurrentMonth()) {
        let index = this.day - 1
        arr[index].isChecked = true
      }
      this.num = arr
    },
    // 获取每个月的第一天是星期几
    getFirstDayOfWeek(year, month) {
      let date = new Date(year, month - 1, 1)
      this.firstDayWeek = date.getDay()
      console.log(this.firstDayWeek)
      if (this.firstDayWeek === 1) {
        this.one = true
        this.two = this.three = this.four = this.five = this.six = this.seven = false
      } else if (this.firstDayWeek === 2) {
        this.one = this.two = true
        this.three = this.four = this.five = this.six = this.seven = false
      } else if (this.firstDayWeek === 3) {
        this.one = this.two = this.three = true
        this.four = this.five = this.six = this.seven = false
      } else if (this.firstDayWeek === 4) {
        this.one = this.two = this.three = this.four = true
        this.five = this.six = this.seven = false
      } else if (this.firstDayWeek === 5) {
        this.one = this.two = this.three = this.four = this.five = true
        this.six = this.seven = false
      } else if (this.firstDayWeek === 6) {
        this.one = this.two = this.three = this.four = this.five = this.six = true
        this.seven = false
      }
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
    // 上个月
    lastMonth() {
      if (this.month != 1) {
        this.month--
        this.getMonthDays()
        this.getFirstDayOfWeek(this.year, this.month)
        this.getAllCheck()
      }
    },
    // 下个月
    nextMonth() {
      if (this.month < 12) {
        this.month++
        this.getMonthDays()
        this.getFirstDayOfWeek(this.year, this.month)
        this.getAllCheck()
      }
    },
    // 签到
    async check() {
      const { data: res } = await this.axios.get('check_record', {
        params: {
          user_id: localStorage.getItem('user_id'),
        },
      })
      if (res.length > 0) {
        this.$message.warning('今日您已经签到过了')
      } else {
        // 早上 8点与9点之间
        const now = new Date()
        const startTime = new Date(this.year, this.month - 1, this.day, 8, 0, 0)
        const endTime = new Date(this.year, this.month - 1, this.day, 9, 0, 0)
        if (now.getTime() >= startTime && now.getTime() < endTime) {
          const { data: res } = await this.axios.post('check', {
            params: {
              user_id: localStorage.getItem('user_id'),
            },
          })
          if (res.status === 200) {
            this.$message.success(res.message)
            this.getMonthDays()
            this.getAllCheck()
          }
        } else {
          this.$message.error('当前不在签到时间范围内')
        }
      }
    },
    // 获取用户的所有签到记录
    async getAllCheck() {
      const { data: res } = await this.axios.get('check_list', {
        params: {
          user_id: localStorage.getItem('user_id'),
        },
      })
      this.checkList = res
      let arr = []
      for (let i = 0; i < this.checkList.length; i++) {
        const dateStr = this.checkList[i].sign_in_time
        const date = new Date(dateStr)
        arr.push({ day: date.getDate(), month: date.getMonth() + 1 })
      }
      for (let i = 0; i < this.checkList.length; i++) {
        if (this.month === arr[i].month) {
          this.num[arr[i].day - 1].checked = true
        }
      }
      console.log(this.num)
      this.$emit('data-change', this.num)
      // this.$store.commit('saveCheckData', this.num)
    },
  },
}
</script>

<style lang="less" scoped>
.checkday {
  width: 510px;
  height: 565px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.1);
}

.head-title {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
  user-select: none;
}
.head {
  width: 480;
  height: 40px;
  display: flex;
}

.head-left,
.head-mid,
.head-right {
  flex: 1;
  height: 100%;
  line-height: 40px;
  text-align: center;
  font-size: 17px;
  color: #333;
  user-select: none;
}
.head-left,
.head-right {
  cursor: pointer;
  border: 1px solid #333;
  border-radius: 5px;
  user-select: none;
}

.day {
  margin-top: 5px;
  padding: 8px;
  width: 480px;
  height: 40px;
  display: flex;
}

.day-item {
  flex: 1;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #333;
  user-select: none;
}
.num {
  padding: 8px;
  width: 480px;
  height: 400px;
  display: flex;
  flex-wrap: wrap;
}

.num-item {
  width: 66px;
  height: 50px;
  text-align: center;
  font-size: 16px;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
}
.txt {
  margin-top: 5px;
  color: #333;
  font-size: 13px;
}
.btn {
  width: 90px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #333;
  border-radius: 5px;
  font-size: 800;
  cursor: pointer;
  user-select: none;
  margin: auto;
}

.active {
  color: #409eff;
}
</style>
