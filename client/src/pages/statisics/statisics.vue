<template>
  <view class="container">
    <view class="title">趋势统计</view>
    <canvas
      canvas-id="lineCanvas"
      disable-scroll="true"
      style="width:750px; height:250px;"
    ></canvas>
    <view class="title">数量统计</view>
    <canvas
      canvas-id="columnCanvas"
      disable-scroll="true"
      style="width:750px; height:250px;"
    ></canvas>
  </view>
</template>

<script>
import wxCharts from "../../utils/wxcharts-min.js";
import { formatYear, expendDuration } from "../../utils/util";

import { LogModel } from "../../models/Log";

const cardLog = new LogModel();

export default {
  name: "Statisics",
  data() {
    return {};
  },
  async onLoad(option) {
    let statisicsOption = JSON.parse(option.statisicsOption);
    const data = await cardLog.getCardLogStatisticsByDuration(statisicsOption);
    let date = [];
    let dailyCounts = [];
    let yAxisRange = data.length;
    let max = 5;
    for (let i = 0; i < yAxisRange; i++) {
      let curSum = data[i].count;
      max = Math.max(max, curSum);
      dailyCounts.push(curSum);
      if (statisicsOption.isComputedForCard) {
        date.push(data[i].cardname ? data[i].cardname : "?");
      } else {
        date.push(data[i].logdt.slice(4));
      }
    }
    let pointName =
      formatYear(new Date(statisicsOption.stime)) +
      "~" +
      formatYear(new Date(statisicsOption.etime)) +
      (statisicsOption.isComputedForCard ? " 各车卡记录" : " 车卡总记录");
    // 绘制折现图
    let chart = new wxCharts({
      canvasId: "lineCanvas",
      type: "line",
      categories: date,
      animation: true,
      series: [
        {
          name: pointName,
          data: dailyCounts
          // format: function(val, name) {
          //   return val.toFixed(2);
          // }
        }
      ],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: "记录日志数 (次)",
        min: 0,
        max: max
      },
      width: 365,
      height: 250,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: "curve"
      }
    });
    // 绘图柱形图
    let colChart = new wxCharts({
      canvasId: "columnCanvas",
      type: "column",
      animation: true,
      categories: date,
      series: [
        {
          name: pointName,
          data: dailyCounts
        }
      ],
      yAxis: {
        title: "记录日志数 (次)",
        min: 0,
        max: max
      },
      xAxis: {
        disableGrid: false,
        type: "calibration"
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: 365,
      height: 250
    });
  },
  methods: {}
};
</script>

<style>
/**index.wxss**/
.title {
  margin: 20px 20px 40px 20px;
  padding-left: 10px;
  height: 55px;
  border-left: #3963bc solid 8px;
  font-weight: 400;
  font-size: 28px;
  line-height: 55px;
  color: #444;
}
</style>
