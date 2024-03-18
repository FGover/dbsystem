<template>
  <div id="echart1" style="width: 100%; height: 280px"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Echart1',
  data() {
    return {}
  },
  mounted() {
    this.chart1 = echarts.init(document.getElementById('echart1'))
    this.initChart()
  },
  methods: {
    async initChart() {
      const { data: res } = await this.axios.get('users')
      let sum1 = 0
      let sum2 = 0
      let sum3 = 0
      let sum4 = 0
      let sum5 = 0
      let sum6 = 0
      let cnt1 = 0
      let cnt2 = 0
      let cnt3 = 0
      let cnt4 = 0
      let cnt5 = 0
      let cnt6 = 0
      res.forEach((item) => {
        if (item.depart === '人事部') {
          sum1 += item.salary
          cnt1++
        } else if (item.depart === '财务部') {
          sum2 += item.salary
          cnt2++
        } else if (item.depart === '研发部') {
          sum3 += item.salary
          cnt3++
        } else if (item.depart === '后勤部') {
          sum4 += item.salary
          cnt4++
        } else if (item.depart === '销售部') {
          sum5 += item.salary
          cnt5++
        } else if (item.depart === '采购部') {
          sum6 += item.salary
          cnt6++
        }
      })
      let arr = []
      arr.push(Math.floor(sum1 / cnt1))
      arr.push(Math.floor(sum2 / cnt2))
      arr.push(Math.floor(sum3 / cnt3))
      arr.push(Math.floor(sum4 / cnt4))
      arr.push(Math.floor(sum5 / cnt5))
      arr.push(Math.floor(sum6 / cnt6))
      const option = {
        title: {
          text: '部门平均薪资',
        },
        xAxis: {
          type: 'category',
          data: ['人事部', '财务部', '研发部', '后勤部', '销售部', '采购部'],
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              // 设置背景横线
              color: '#BBBBBB',
            },
          },
        },
        series: [
          {
            data: arr,
            type: 'line',
            lineStyle: {
              color: 'green',
            },
          },
        ],
      }
      this.chart1.setOption(option)
      const chart1 = this.chart1
      window.addEventListener('resize', function () {
        chart1.resize()
      })
    },
  },
}
</script>
