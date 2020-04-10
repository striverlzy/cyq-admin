// map-option.js
/*
* 饼图初始信息
* */
export default {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  label: {
    trigger: 'item',
    formatter: "{b}\n{d}%"
  },
  // 默认色板
  color: ["#5793f3", "#d14a61", "#675bba"],
  legend: {
    data: []
  },
  series: [
    {
      name: '默认饼图',
      type: 'pie',
      radius: "70%",
      center: ["50%", "60%"],
      avoidLabelOverlap: false,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      },
      data: []
    }
  ]
}
