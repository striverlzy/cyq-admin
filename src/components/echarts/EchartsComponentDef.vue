<template>
  <!--
  默认模版
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
  <EchartsComponent :chartsid="echar.chartsid" :option="echar.option" :width="echar.width" :height="echar.height"
                    :sty="echar.sty"
                    :isDefault="isDefault" :isLegend="isLegend" ref="getEchartChild"
                    @legendChange="legendChange"></EchartsComponent>
</template>
<script>
  import EchartsComponent from '../echarts/EchartsComponent'

  export default {
    data() {
      return {
        echar: {
          chartsid: 'chartsid',
          width: '600px',
          height: '400px',
          sty: '',
          option: {}
        }
      }
    },
    components: {
      EchartsComponent: EchartsComponent
    },
    props: {
      chartsid: {
        type: String
      },
      option: {
        type: Object,
        default: function() {
          return {}
        }
      },
      width: {
        type: String,
        default: ''
      },
      height: {
        type: String,
        default: ''
      },
      sty: {
        type: String,
        default: ''
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
      setParamsDef() {
        if (this.option != undefined && this.option != null) {
          this.echar.option = this.option
        }
        if (this.chartsid != undefined && this.chartsid != null && this.chartsid !== '') {
          this.echar.chartsid = this.chartsid
        }
        if (this.width != undefined && this.width != null && this.width !== '') {
          this.echar.width = this.width
        }
        if (this.height != undefined && this.height != null && this.height !== '') {
          this.echar.height = this.height
        }
        if (this.sty != undefined && this.sty != null && this.sty !== '') {
          this.echar.sty = this.sty
        }
      },
      updateHandleOption(paramOption, selectedItem) {
        this.$refs.getEchartChild.updateHandleOption(paramOption, selectedItem)
      },
      legendChange(obj) {
        this.$emit('legendChange', obj)
      },
      showLoading() {
        this.$refs.getEchartChild.showLoading()
      },
      hideLoading() {
        this.$refs.getEchartChild.hideLoading()
      }
    },
    // 调用
    created() {
      this.setParamsDef()
    }
  }
</script>
