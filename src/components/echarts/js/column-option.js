// map-option.js
/*
* 柱图初始信息
* */
export default {
  color: ['#5793f3', '#d14a61'],
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: []
  },
  grid: {
    left: '0',
    right: '0',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
    // min: 5, // 最小刻度线
    // max: 500 // 最大刻度线
  },
  series: [
    // {
    //   name: '直接访问',
    //   type: 'bar',
    //   stack: '总量',
    //   barMinHeight: 3, // 柱状图的最小高度
    //   // barGap: '50%',            // 柱间距离，默认为柱形宽度的30%，可设固定值
    //   // barCategoryGap : '30%',   // 类目间柱形距离，默认为类目间距的20%，可设固定值
    //   barWidth: 8, // 柱图宽度insideLeft
    //   label: {
    //     normal: {
    //       show: true,
    //       position: 'insideRight'
    //     }
    //   },
    //   data: []
    // }
  ]
}
