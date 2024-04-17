<template>
  <div id="echart3" style="width: 50%; height: 280px"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Echart3',
  data() {
    return {}
  },
  mounted() {
    this.chart3 = echarts.init(document.getElementById('echart3'))
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
      let sum = cnt1 + cnt2 + cnt3 + cnt4 + cnt5 + cnt6
      let arr = [cnt1, cnt2, cnt3, cnt4, cnt5, cnt6]
      // 保留两位小数
      cnt1 = (cnt1 / sum).toFixed(2)
      cnt2 = (cnt2 / sum).toFixed(2)
      cnt3 = (cnt3 / sum).toFixed(2)
      cnt4 = (cnt4 / sum).toFixed(2)
      cnt5 = (cnt5 / sum).toFixed(2)
      cnt6 = (cnt6 / sum).toFixed(2)
      const myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6', '#32c5e9']
      const option = {
        title: {
          text: '各部门人数占百分比',
          left: 'center',
        },
        grid: {
          top: '10%',
          left: '22%',
          bottom: '10%',
        },
        xAxis: {
          // 不显示x轴
          show: false,
        },
        yAxis: [
          {
            type: 'category',
            // 将y轴改为正向
            inverse: true,
            // 显示文字
            data: ['人事部', '财务部', '研发部', '后勤部', '销售部', '采购部'],
            // 不显示y轴线条
            axisLine: {
              show: false,
            },
            // 不显示刻度
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: '#000',
            },
          },
          {
            show: true,
            data: arr,
            inverse: true,
            // 不显示y轴线条
            axisLine: {
              show: false,
            },
            // 不显示刻度
            axisTick: {
              show: false,
            },
            axisLabel: {
              fontSize: 12,
              color: '#000',
            },
          },
        ],
        series: [
          {
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            // 柱子间的距离
            barCategoryGap: 50,
            // 柱子的宽度
            barWidth: 10,
            // 柱子设为圆角
            itemStyle: {
              borderRadius: 20,
              color: function (params) {
                // dataIndex是当前柱子的索引号
                return myColor[params.dataIndex]
              },
            },
            // 设置柱子内百分比显示数据
            label: {
              show: true,
              // 图形内显示
              position: 'inside',
              // 文字的显示格式 {c}会自动解析为数据 data里面的数据
              formatter: '{c}%',
            },
            data: [cnt1 * 100, cnt2 * 100, cnt3 * 100, cnt4 * 100, cnt5 * 100, cnt6 * 100],
          },
          {
            name: '框',
            type: 'bar',
            yAxisIndex: 1,
            // 柱子间的距离
            barCategoryGap: 50,
            // 柱子的宽度
            barWidth: 15,
            itemStyle: {
              color: 'none',
              borderColor: '#00c1de',
              borderWidth: 3,
              borderRadius: 15,
            },
            data: [100, 100, 100, 100, 100, 100],
          },
        ],
      }
      this.chart3.setOption(option)
      const chart3 = this.chart3
      window.addEventListener('resize', function () {
        chart3.resize()
      })
    },
  },
}
</script>
