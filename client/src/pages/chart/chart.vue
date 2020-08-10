<template>
  <view class="chart-container">
    <view class="title">车卡记录统计</view>
    <l-form-item name="stime" label="起始时间" style="font-size:14px;" label-width="170rpx">
      <picker mode="date" @change="bindstimeChange" v-model="stime">
        <view class="picker">{{ stime }}</view>
      </picker>
    </l-form-item>
    <l-form-item name="etime" label="结束时间" style="font-size:14px;" label-width="170rpx">
      <picker mode="date" @change="bindetimeChange" v-model="etime">
        <view class="picker">{{ etime }}</view>
      </picker>
    </l-form-item>
    <l-form-item name="dept_id" label="工区" label-width="170rpx" style="font-size:14px;">
      <picker @change="bindDeptPickerChange" :value="deptIdx" :range="deptArr" v-model="deptIdx">
        <view class="picker">{{ deptArr[deptIdx] }}</view>
      </picker>
    </l-form-item>
    <l-form-item name="dev_id" label="设备" label-width="170rpx" style="font-size:14px;">
      <picker @change="bindDevPickerChange" :value="devIdx" :range="devArr">
        <view class="picker">{{ devArr[devIdx] }}</view>
      </picker>
    </l-form-item>
    <l-form-item name="dev_id" label="统计方式" label-width="170rpx" style="font-size:14px;">
      <view class="switch-box">
        <switch
          :checked="isComputedForCard"
          :color="switchType"
          style="transform: scale(0.8);margin: auto 0"
          @change="onSwitch"
        />
        <text style="margin-left:0px">
          {{
          isComputedForCard ? "按卡号统计数据！" : "按日期统计数据！"
          }}
        </text>
      </view>
    </l-form-item>
    <l-form-item name="cardname" label="车号" label-width="170rpx" style="font-size:14px;">
      <l-input
        id="cardname"
        v-model="cardname"
        placeholder="请输入车号"
        :hide-label="true"
        @lininput="bindCardNameChange"
      />
    </l-form-item>
    <view class="padRight">
      <l-button type="default" size="medium" @lintap="onList">统计表</l-button>
      <l-button type="warning" size="medium" @lintap="onCompute">统计图</l-button>
    </view>
    <view class="blockquote">{{ msg }}</view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import { CompanyModel } from "../../models/Company";

import { formatYear } from "../../utils/util";

export default {
  name: "Chart",
  components: {},
  data() {
    return {
      dev_id: 0,
      dept_id: 0,
      cardname: "", // 车号
      stime: "", // 起始时间
      etime: "", // 结束时间
      switchType: "#3963bc",
      isComputedForCard: false,

      deptInfos: [],
      devInfos: [],
      deptArr: [],
      devArr: [],
      devIdx: 0,
      deptIdx: 0,
      msg:
        "记录信息查询时间范围为起始日的00:00到结束日的23:59，筛选条件中工区和设备默认查询所有，车号需要输入完整精确查询。",
    };
  },
  async onLoad() {
    const today = new Date();
    this.stime = formatYear(today); // 起始时间
    this.etime = formatYear(today); // 结束时间
    const sys_option = Taro.getStorageSync("sys_info");
    const company = new CompanyModel(sys_option);
    let [deptInfos, deptArr, devInfos, devArr] = await company.getDevidedInfo();
    deptArr.unshift("所有工区");
    devArr.unshift("所有设备");
    this.deptInfos = deptInfos;
    this.devInfos = devInfos;
    this.deptArr = deptArr;
    this.devArr = devArr;
  },
  methods: {
    bindstimeChange(e) {
      this.stime = e.detail.value;
    },
    bindetimeChange(e) {
      this.etime = e.detail.value;
    },
    bindDeptPickerChange(e) {
      this.deptIdx = e.detail.value;
    },
    bindDevPickerChange(e) {
      this.devIdx = e.detail.value;
    },
    bindCardNameChange(e) {
      this.cardname = e.detail.value;
    },
    onSwitch() {
      this.isComputedForCard = !this.isComputedForCard;
    },
    async onCompute() {
      const sys_option = Taro.getStorageSync("sys_info");
      let option = {
        comp_id: sys_option.id,
        dept_id:
          this.deptArr[this.deptIdx] === "所有工区"
            ? ""
            : this.deptInfos[this.deptIdx - 1].dept_id,
        dev_id:
          this.devArr[this.devIdx] === "所有设备"
            ? ""
            : this.devInfos[this.devIdx - 1].dev_id,
        cardname: this.cardname,
        stime: this.stime + " 00:00:00",
        etime: this.etime + " 23:59:59",
        isComputedForCard: this.isComputedForCard,
      };
      console.log(option);
      Taro.navigateTo({
        url:
          "/pages/statisics/statisics?statisicsOption=" +
          JSON.stringify(option),
      });
    },
    async onList() {
      const sys_option = Taro.getStorageSync("sys_info");
      let option = {
        comp_id: sys_option.id,
        dept_id:
          this.deptArr[this.deptIdx] === "所有工区"
            ? ""
            : this.deptInfos[this.deptIdx - 1].dept_id,
        dev_id:
          this.devArr[this.devIdx] === "所有设备"
            ? ""
            : this.devInfos[this.devIdx - 1].dev_id,
        cardname: this.cardname,
        stime: this.stime + " 00:00:00",
        etime: this.etime + " 23:59:59",
        isComputedForCard: this.isComputedForCard,
      };
      Taro.navigateTo({
        url:
          "/pages/statisicsList/statisicsList?statisicsOption=" +
          JSON.stringify(option),
      });
    },
  },
};
</script>

<style>
.title {
  margin: 20px 0px 20px 20px;
  padding-left: 10px;
  height: 55px;
  border-left: #3963bc solid 8px;
  font-weight: 400;
  font-size: 28px;
  line-height: 55px;
  color: #444;
}

.chart-container {
  display: flex;
  flex-direction: column;
}

.picker {
  padding-left: 25px;
  font-size: 27px;
  color: black;
}

.padRight {
  flex: row;
  justify-content: flex-end;
  margin-top: 20px;
  padding: 0 30px;
  display: flex;
}

.padRight l-button {
  margin-left: 20px;
}

.switch-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 16rpx;
  font-size: 26px;
  color: #3963bc;
  font-size: 300;
}

.blockquote {
  position: relative;
  width: 80%;
  box-sizing: border-box;
  margin: 90px auto;
  border-width: 1px 0;
  border-color: #dcdcdc;
  border-style: solid;
  padding: 30px;
  font-size: 24px;
  font-weight: 200;
  color: #777;
  z-index: 10;
}

.blockquote::before {
  content: "†";
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 40px;
  height: 30px;
  font: 50px/50px pt sans, sans-serif;
  color: #3963bc;
  z-index: 100;
  text-align: center;
}
</style>
