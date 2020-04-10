<template>
  <!--
  基础模版
  参数信息：
    chartsid：Echarts图容器ID，如一个页面引用多个组件，应保证容器ID不能相同
    option：Echarts图显示的数据项
    width：宽度，如：500px、100%
    height：高度，如：500px、100%
    sty：style样式信息
    isDefault：是否默认选中第一项，暂时只对饼图有效，若第一项值为0，则不会选中
  可回调方法：
    updateHandleOption：数据加载完更新Echarts Option信息，可通过该方法改变Echarts图的显示信息
    showLoading：加载中提示
    hideLoading：取消加载中提示
  -->
  <div :id="chartsid" :style="defStyle+((sty!=undefined && sty!=null)?sty+';':'')"></div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    data() {
      return {
        charts: '',
        defStyle: 'width: 600px;height: 400px;'// :style="style" :width="width" :height="height"
      }
    },
    props: {
      chartsid: {
        type: String
      },
      option: {
        type: Object
      },
      width: {
        type: String
      },
      height: {
        type: String
      },
      sty: {
        type: String
      },
      isLegend: {
        type: Boolean,
        default: false
      },
      isDefault: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      drawPie(id, option) {
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption(option)
        if (this.isLegend) {
          this.legendChange()
        }
        // if(this.isDefault) {
        //   // this.defaultChange(0);
        // }
      },
      setStyle() {
        if (this.width != undefined && this.width != null && this.height != undefined && this.height != null) {
          var divtest = document.getElementById(this.chartsid)
          divtest.style.width = this.width
          divtest.style.height = this.height
        }
      },
      updateHandleOption(paramOption = {}, index = 0) {
        this.setWidthAndHeight()
        try {
          this.hideLoading()
          this.charts.setOption(paramOption)
        } catch (e) {
          console.log('setOption', e.toString())
        }
        if (this.isDefault) {
          // 1,进入页面可以触发第1条数据的选中action
          if (index === undefined) {
            index = 0
          }
          this.defaultChange(index)
        }
      },
      showLoading() { // 加载中...
        this.charts.showLoading()
      },
      hideLoading() { // 取消加载中
        this.charts.hideLoading()
      },
      defaultChange(index) {
        // 1,进入页面可以触发第1条数据的选中action
        this.charts.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: index })
        // 2,鼠标指向别的图块时,展示选中数据的图块信息,隐藏默认色块高亮信息
        this.charts.on('mouseover', (v) => {
          if (v.dataIndex != index) {
            this.charts.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: index
            })
          }
        })
        // 3,鼠标离开环形图时,展示默认第一条数据
        this.charts.on('mouseout', () => {
          this.charts.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: index })
        })
      },
      legendChange() {
        this.charts.on('legendselectchanged', (obj) => {
          // console.log('legendselectchanged obj', obj)
          this.$emit("legendChange", obj)
        })
      },
      /**
       * 设置echart图形的宽高
       */
      setWidthAndHeight() {
        // let obj = $('#' + this.chartsid + '').parents('.controlEchart')
        // if (obj.length > 0) {
        //   let width = obj.width()
        //   let height = obj.height()
        //   document.getElementById(this.chartsid).style.width = width + 'px'
        //   document.getElementById(this.chartsid).style.height = height + 'px'
        //
        //   this.charts.dispose()
        //   this.charts = echarts.init(document.getElementById(this.chartsid))
        // }
      }
    },
    // 调用
    mounted() {
      // 生命周期 - 挂载完成（可以访问DOM元素）
      // 设置大小
      this.setStyle()
      // 设置内容
      this.drawPie(this.chartsid, this.option)
    },
    beforeDestroy() {
      this.charts.dispose()
    }
  }
</script>
