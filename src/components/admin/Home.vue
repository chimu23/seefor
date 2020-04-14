<template>
  <div class="box">
    <div id="main" ref="mychart" style="width: 600px;height:700px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    this.build()
  },
  data () {
    return {
      totalData: []
    }
  },
  methods: {
    async build () {
      const { data: res } = await this.$http.get('admin/total')
      if (res.status !== 200) return
      var scaleData = res.data

      var myChart = echarts.init(this.$refs.mychart)

      // 指定图表的配置项和数据

      var rich = {
        white: {
          color: '#ddd',
          align: 'center',
          padding: [5, 0]
        }
      }
      var placeHolderStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0
        }
      }
      var data = []
      for (let i = 0; i < scaleData.length; i++) {
        data.push(
          {
            value: Number(scaleData[i].value),
            name: scaleData[i].name,
            itemStyle: {
              normal: {
                borderWidth: 5,
                shadowBlur: 30,
                borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  {
                    offset: 0,
                    color: '#7777eb'
                  },
                  {
                    offset: 1,
                    color: '#70ffac'
                  }
                ]),
                shadowColor: 'rgba(142, 152, 241, 0.6)'
              }
            }
          },
          {
            value: 4,
            name: '',
            itemStyle: placeHolderStyle
          }
        )
      }
      var seriesObj = [
        {
          name: '',
          type: 'pie',
          center: ['50%', '50%'],
          clockWise: false,
          radius: [145, 150],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'outside',
                color: '#ddd',
                fontSize: 13,
                formatter: function (params) {
                  var percent = 0
                  var total = 0
                  for (let i = 0; i < scaleData.length; i++) {
                    total += Number(scaleData[i].value)
                  }
                  percent = ((params.value / total) * 100).toFixed(0)
                  if (params.name !== '') {
                    return params.name + '\n{white|' + '占比' + percent + '%}'
                  } else {
                    return ''
                  }
                },
                rich: rich
              },
              labelLine: {
                show: true
              }
            }
          },
          data: data
        }
      ]
      var option = {
        backgroundColor: '#04243E',
        tooltip: {
          show: false
        },
        legend: {
          show: false
        },
        toolbox: {
          show: false
        },
        series: seriesObj
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option, true)
    }
  }
}
</script>

<style lang='less' scoped>
.box {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  width: 100%;
  background-color: #04243e;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
