<template>
  <!--
  柱图初始信息
  -->
  <EchartsComponentDef :chartsid="chartsid" :option="cakeEchart.option" :width="width" :height="height"
                       :sty="sty" :isDefault="cakeEchart.isDefault" :isLegend="isLegend" ref="defEchartChild"
                       @legendChange="legendChange"></EchartsComponentDef>
</template>
<script>
  import EchartsComponentDef from '../echarts/EchartsComponentDef'
  import optionMB from '../echarts/js/column-option.js' // 引入配置项
  export default {
    data() {
      return {
        cakeEchart: {
          option: Object.assign({}, optionMB),
          isDefault: false
        }
      }
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
      }
    },
    methods: {
      loadCakeData() {
        // 设置option
        let voption = this.option
        if (voption != null && voption != undefined) {
          Object.keys(voption).map((key) => {
            this.cakeEchart.option[key] = voption[key]
          })
        }
      },
      updateHandleOption(paramOption = {}) {
        if (paramOption != null && paramOption != undefined) {
          Object.keys(paramOption).map((key) => {
            this.cakeEchart.option[key] = paramOption[key]
          })
          this.$refs.defEchartChild.updateHandleOption(this.cakeEchart.option)
        }
      },
      legendChange(obj) {
        this.$emit('legendChange', obj)
      },
      showLoading() {
        this.$refs.defEchartChild.showLoading()
      },
      hideLoading() {
        this.$refs.defEchartChild.hideLoading()
      }
    },
    created() {
      this.loadCakeData()
    },
    components: {
      EchartsComponentDef
    }
  }
</script>
