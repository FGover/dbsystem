<template>
  <div id="checkechart" style="width: 100%; height: 565px; background-color: #fff; margin-left: 40px; box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.1)"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'checkEchart',
  props: {
    checkData: {
      type: Array,
      required: true,
    },
  },
  watch: {
    // 监听
    checkData() {
      this.updateChart()
    },
  },
  data() {
    return {}
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('checkechart'))
    this.updateChart()
  },
  methods: {
    updateChart() {
      const checkdata = this.$props.checkData
      let arr = []
      let count1 = 0
      let count2 = 0
      for (let i = 0; i < checkdata.length; i++) {
        if (checkdata[i].checked) {
          count1++
        } else {
          count2++
        }
      }
      arr.push({ value: count1, name: '打卡' }, { value: count2, name: '缺勤' })

      const option = {
        title: {
          text: '当月考勤打卡分布图',
          left: 'center',
          y: 25,
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '15%',
          left: 20,
          orient: 'vertical',
        },
        series: [
          {
            type: 'pie',
            top: '15%',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
              color: (list) => {
                var colorList = [
                  {
                    colorStart: '#abdcff',
                    colorEnd: '#0396ff',
                  },
                  {
                    colorStart: '#90f7ec',
                    colorEnd: '#32ccbc',
                  },
                ]
                return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: colorList[list.dataIndex]['colorStart'],
                  },
                  {
                    offset: 1,
                    color: colorList[list.dataIndex]['colorEnd'],
                  },
                ])
              },
            },
            label: {
              show: false,
              position: 'center',
            },
            labelLine: {
              show: false,
            },
            data: arr,
          },
        ],
      }
      // 绘制图表
      this.myChart.setOption(option)
      const Chart = this.myChart
      window.addEventListener('resize', function () {
        Chart.resize()
      })
    },
  },
}
</script>

