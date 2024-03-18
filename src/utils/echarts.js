import * as echarts from 'echarts'

export const option1 = {
  xAxis: {
    type: 'category',
    show: false,
  },
  yAxis: {
    type: 'value',
    show: false,
  },
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 10,
  },
  series: [
    {
      data: [Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1)],
      type: 'line',
      symbolSize: 0,
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(1, 132, 213, 0.4)', // 渐变色的起始颜色
          },
          {
            offset: 1,
            color: 'rgba(1, 132, 213, 0.1)', // 渐变线的结束颜色
          },
        ]),
      },
    },
  ],
}

export const option2 = {
  xAxis: {
    type: 'category',
    show: false,
  },
  yAxis: {
    type: 'value',
    show: false,
  },
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 10,
  },
  lineStyle: {
    color: '#00cc99',
  },
  series: [
    {
      data: [Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1)],
      type: 'line',
      symbolSize: 0,
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(1, 132, 213, 0.3)', // 渐变色的起始颜色
          },
          {
            offset: 1,
            color: 'rgba(1, 132, 213, 0.1)', // 渐变线的结束颜色
          },
        ]),
      },
    },
  ],
}

export const option3 = {
  xAxis: {
    type: 'category',
    show: false,
  },
  yAxis: {
    type: 'value',
    show: false,
  },
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 10,
  },
  lineStyle: {
    color: '#cc66ff',
  },
  series: [
    {
      data: [Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1)],
      type: 'line',
      symbolSize: 0,
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(1, 132, 213, 0.3)', // 渐变色的起始颜色
          },
          {
            offset: 1,
            color: 'rgba(1, 132, 213, 0.1)', // 渐变线的结束颜色
          },
        ]),
      },
    },
  ],
}

export const option4 = {
  xAxis: {
    type: 'category',
    show: false,
  },
  yAxis: {
    type: 'value',
    show: false,
  },
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 10,
  },
  lineStyle: {
    color: '#ffcc00',
  },
  series: [
    {
      data: [Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1), Math.floor(Math.random() * 1000 + 1)],
      type: 'line',
      symbolSize: 0,
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(1, 132, 213, 0.3)', // 渐变色的起始颜色
          },
          {
            offset: 1,
            color: 'rgba(1, 132, 213, 0.1)', // 渐变线的结束颜色
          },
        ]),
      },
    },
  ],
}
