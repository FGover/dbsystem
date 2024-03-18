<template>
  <div id="echart2" style="width: 50%; height: 280px"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Echart2',
  data() {
    return {}
  },
  mounted() {
    this.chart2 = echarts.init(document.getElementById('echart2'))
    this.initChart()
  },
  methods: {
    async initChart() {
      const { data: res } = await this.axios.get('users')
      let cnt1 = 0
      let cnt2 = 0
      let cnt3 = 0
      let cnt4 = 0
      let cnt5 = 0
      let cnt6 = 0
      res.forEach((item) => {
        if (item.depart === '人事部') {
          cnt1++
        } else if (item.depart === '财务部') {
          cnt2++
        } else if (item.depart === '研发部') {
          cnt3++
        } else if (item.depart === '后勤部') {
          cnt4++
        } else if (item.depart === '销售部') {
          cnt5++
        } else if (item.depart === '采购部') {
          cnt6++
        }
      })
      let arr = [
        { value: cnt1, name: '人事部' },
        { value: cnt2, name: '财务部' },
        { value: cnt3, name: '研发部' },
        { value: cnt4, name: '后勤部' },
        { value: cnt5, name: '销售部' },
        { value: cnt6, name: '采购部' },
      ]

      const option = {
        color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9'],
        title: {
          text: '各部门人数分布图',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '人数',
            type: 'pie',
            radius: '50%',
            center: ['50%', '60%'],
            data: arr,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
      this.chart2.setOption(option)
      const chart2 = this.chart2
      window.addEventListener('resize', function () {
        chart2.resize()
      })
    },
  },
}
</script>
