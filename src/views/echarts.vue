<template>
  <div style="text-align: -webkit-center;overflow: auto;height: 100%">
    <EchartsComponentDef :option="echar.option" :chartsid="echar.chartsid" :width="echar.width"
                         :height="echar.height"></EchartsComponentDef>
    <EchartsComponentDef :option="echar2.option" :chartsid="echar2.chartsid" :width="echar2.width"
                         :height="echar2.height"></EchartsComponentDef>
    <EchartsComponentDef :option="echar3.option" :chartsid="echar3.chartsid" :width="echar3.width"
                         :height="echar3.height"></EchartsComponentDef>
    <EchartsComponentDef :option="echar1.option" :chartsid="echar1.chartsid" :width="echar1.width"
                         :height="echar1.height"></EchartsComponentDef>
    <EchartsComponentDef :option="echar4.option" :chartsid="echar4.chartsid" :width="echar4.width"
                         :height="echar4.height"></EchartsComponentDef>

    <CakeEchartsComponent :option="echar11.option" :chartsid="echar11.chartsid" :width="echar11.width"
                          :height="echar11.height"></CakeEchartsComponent>
    <ColumnEchartsComponent :option="echar12.option" :chartsid="echar12.chartsid" :width="echar4.width"
                            :height="echar12.height"></ColumnEchartsComponent>

    <ColumnEchartsComponent ref="getEchartChildRef" :option="echar13.option" :chartsid="echar13.chartsid"
                            :width="echar13.width"
                            :height="echar13.height" :isLegend="true"
                            @legendChange="legendChangeHanlder"></ColumnEchartsComponent>
  </div>
</template>
<script>
  import EchartsComponentDef from '../components/echarts/EchartsComponentDef'
  import CakeEchartsComponent from '../components/echarts/CakeEchartsComponent'
  import ColumnEchartsComponent from '../components/echarts/ColumnEchartsComponent'

  export default {
    name: 'demo',
    data() {
      return {
        echar: {
          chartsid: 'chartsid',
          width: '600px',
          height: '400px',
          option: {
            title: {
              text: '重点关注的图表',
              subtext: '纯属虚构',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'right',
              data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                  { value: 335, name: '直接访问' },
                  { value: 310, name: '邮件营销' },
                  { value: 234, name: '联盟广告' },
                  { value: 135, name: '视频广告' },
                  { value: 1548, name: '搜索引擎' }
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        },
        echar1: {
          chartsid: 'chartsid1',
          width: '600px',
          height: '400px',
          option: {
            title: {
              text: '折线图表',
              subtext: '纯属虚构',
              x: 'center'
            },
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
              }
            ]
          }
        },
        echar2: {
          chartsid: 'chartsid2',
          width: '600px',
          height: '400px',
          option: {
            title: {
              text: '饼状图表',
              subtext: '纯属虚构',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              x: 'right',
              data: ['图例一', '图例二', '图例三']
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [
                  { value: 335, name: '图例一' },
                  { value: 100, name: '图例二' },
                  { value: 500, name: '图例三' }
                ]
              }
            ]
          }
        },
        echar3: {
          chartsid: 'chartsid3',
          width: '600px',
          height: '400px',
          option: {
            color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220]
              }
            ]
          }
        },
        echar4: {
          chartsid: 'chartsid4',
          width: '600px',
          height: '400px',
          option: {
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
              }
            ]
          }
        },
        echar11: {
          chartsid: 'chartsid11',
          width: '600px',
          height: '400px',
          option: {
            color: ['#656565', '#B8B8B8', '#515151'],
            legend: {
              x: 'left',
              data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                avoidLabelOverlap: false,
                data: [
                  { value: 335, name: '直接访问' },
                  { value: 310, name: '邮件营销' },
                  { value: 234, name: '联盟广告' },
                  { value: 135, name: '视频广告' },
                  { value: 1548, name: '搜索引擎' }
                ]
              }
            ]
          }
        },
        echar12: {
          chartsid: 'echar12',
          width: '600px',
          height: '400px',
          option: {
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              },
              textStyle: {
                color: '#c23531'
              },
              backgroundColor: '#fff'

            },
            color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            xAxis: {
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
              axisLine: { // 坐标线
                show: false
              },
              axisTick: { // 刻度线
                show: false
              }
            },
            yAxis: {
              type: 'value',
              axisLine: { // 坐标线
                show: false
              },
              axisTick: { // 刻度线
                show: false
              }
            },
            series: [
              {
                name: '直接访问',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: [320, 302, 301, 334, 390, 330, 320]
              },
              {
                name: '邮件营销',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: '联盟广告',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                name: '视频广告',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: [150, 212, 201, 154, 190, 330, 410]
              },
              {
                name: '搜索引擎',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: [820, 832, 901, 934, 1290, 1330, 1320]
              }
            ]
          }
        },
        echar13: {
          chartsid: 'echar13',
          width: '100%',
          height: '400px',
          option: {
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                // 'line' 直线指示器
                // 'shadow' 阴影指示器
                // 'none' 无指示器
                // 'cross' 十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer。
                type: 'cross' // 默认为直线，可选为：'line' | 'shadow'
              },
              textStyle: {
                align: 'left'
              }
            },
            grid: {
              // x:0,  //左留白
              // y:10,   //上留白
              // x2: 25,   //右留白
              // y2: 0,   //下留白
              // x: 10,  //左留白
              // x2:20,  //右留白
              // y: 20,   //上留白
              // y2:20,   //下留白
              // // bottom:'0',
              // containLabel: false
              left: '10',
              right: '10',
              bottom: '3%',
              containLabel: true
            },
            legend: {
              x: 'left',
              data: ['直接访问', '邮件营销', '联盟广告飞飞飞发', '视频广告', '搜索引擎']
            },
            color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            xAxis: {
              type: 'category',
              data: [],
              axisLine: { // 坐标线
                show: false
              },
              axisLabel: {
                rotate: 30
              },
              axisTick: { // 刻度线
                show: false
              }
            },
            yAxis: {
              type: 'value',
              axisLine: { // 坐标线
                show: false
              },
              axisTick: { // 刻度线
                show: false
              }
            },
            series: []
          }
        },
        echar00: {
          chartsid: 'chartsid00',
          width: '600px',
          height: '400px',
          option: {}
        }
      }
    },
    methods: {
      loadData() {
        // 加载中提示
        this.$refs.getEchartChildRef.showLoading()
        this.echar13.option.xAxis.data = ['广州社保局', '广州公积金服务中心', '政务服务大厅', '行业事业部', '东健物业', '华资软件', '飒沓打算信息中心', '我去恶趣味信息中心', '未全额无群信息中心', '玩儿玩儿玩儿信息中心', '而特让他信息中心', '王蓉蓉提供方信息中心', '飒沓打算信息中心', '我去恶趣味信息中心11', '未全额无群信息中心11', '玩儿玩儿玩儿信息中心11', '而特让他信息中心11', '王蓉蓉提供方信息中心11']
        this.echar13.option.series = [
          {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            barWidth: 10,
            // label: {
            //   normal: {
            //     show: true,
            //     position: 'insideRight'
            //   }
            // },
            data: [320, 302, 301, 334, 390, 330, 320, 302, 301, 334, 390, 330, 320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: '邮件营销',
            type: 'bar',
            stack: '总量',
            // label: {
            //   normal: {
            //     show: false,
            //     position: 'insideRight'
            //   }
            // },
            data: [120, 132, 101, 134, 90, 230, 210, 302, 301, 334, 390, 330, 320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: '联盟广告飞飞飞发',
            type: 'bar',
            stack: '总量',
            // label: {
            //   normal: {
            //     show: true,
            //     position: 'insideRight'
            //   }
            // },
            data: [220, 182, 191, 234, 290, 330, 310, 302, 301, 334, 390, 330, 320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: '视频广告',
            type: 'bar',
            stack: '总量',
            // label: {
            //   normal: {
            //     show: true,
            //     position: 'insideRight'
            //   }
            // },
            data: [150, 212, 201, 154, 190, 330, 410, 302, 301, 334, 390, 330, 320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'bar',
            stack: '总量',
            // label: {
            //   normal: {
            //     show: true,
            //     position: 'insideRight'
            //   }
            // },
            data: [820, 832, 901, 934, 1290, 1330, 1320, 302, 301, 334, 390, 330, 320, 302, 301, 334, 390, 330, 320]
          }
        ]
        this.$refs.getEchartChildRef.updateHandleOption(this.echar13.option)
      },
      legendChangeHanlder(obj) {
        console.log('legendChangeHanlder obj', obj)
        alert(obj.name + ':' + obj.selected[obj.name])
      }
    },
    components: {
      EchartsComponentDef: EchartsComponentDef, // 将别名echartsInclude 变成 组件 EchartsInclude
      CakeEchartsComponent,
      ColumnEchartsComponent
    },
    mounted() {
      this.loadData()
    }
  }
</script>
