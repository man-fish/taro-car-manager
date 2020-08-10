<template>
  <view class="container">
    <view class="title">{{ title }} 打卡趋势统计</view>
    <canvas canvas-id="lineCanvas" disable-scroll="true" style="width:750px; height:250px;"></canvas>
    <view class="title">{{ title }} 打卡数量统计</view>
    <canvas canvas-id="columnCanvas" disable-scroll="true" style="width:750px; height:250px;"></canvas>
  </view>
</template>

<script>
import wxCharts from "../../utils/wxcharts-min.js";

import { LogModel } from "../../models/Log";

const cardLog = new LogModel();

export default {
  name: "Statisics",
  data() {
    return {
      title: ""
    };
  },
  async onLoad(option) {
    let statisicsOption = JSON.parse(option.statisicsOption);
    // statisicsOption = {
    //   comp_id: 1,
    //   dept_id: 13,
    //   dev_id: 1,
    //   year: 2020
    //   // month: 7
    // };
    const data = await cardLog.getCardLogStatisticsByDuration(statisicsOption);
    console.log(data);
    debugger;
    let date = [];
    let dailyCounts = [];
    let max = 5;
    if (statisicsOption.month) {
      this.title = `${statisicsOption.year}年${statisicsOption.month}月`;
      for (let i = 1; i <= 31; i++) {
        date.push(`${statisicsOption.month}-${i}`);
        let curSum = 0;
        data[i].forEach(cardLog => {
          curSum += cardLog.card_count;
        });
        max = Math.max(max, curSum);
        dailyCounts.push(curSum);
      }
    } else {
      this.title = `${statisicsOption.year}年`;
      for (let i = 1; i <= 12; i++) {
        date.push(`${statisicsOption.year}-${i}`);
        let curSum = 0;
        data[i].forEach(cardLog => {
          curSum += cardLog.card_count;
        });
        max = Math.max(max, curSum);
        dailyCounts.push(curSum);
      }
    }
    let chart = new wxCharts({
      canvasId: "lineCanvas",
      type: "line",
      categories: date,
      animation: true,
      series: [
        {
          name: "所有车卡",
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

    let colChart = new wxCharts({
      canvasId: "columnCanvas",
      type: "column",
      animation: true,
      categories: date,
      series: [
        {
          name: "所有车卡",
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
  }
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