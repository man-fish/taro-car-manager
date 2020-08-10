<template>
  <view class="chart-container">
    <view class="title">车卡记录统计</view>
    <l-form-item name="createtime" label="范围选择" style="font-size:14px;" label-width="170rpx">
      <picker mode="date" fields="month" v-model="date" @change="bindDateChange">
        <view class="picker">{{ date.split("-")[0] + " 年 " + date.split("-")[1] + " 月 " }}</view>
      </picker>
    </l-form-item>
    <l-form-item name="dept_id" label="工区" label-width="170rpx" style="font-size:14px;">
      <picker @change="bindDeptPickerChange" :value="deptIdx" :range="deptArr" v-model="deptIdx">
        <view class="picker">{{deptArr[deptIdx]}}</view>
      </picker>
    </l-form-item>
    <l-form-item name="dev_id" label="设备" label-width="170rpx" style="font-size:14px;">
      <picker @change="bindDevPickerChange" :value="devIdx" :range="devArr">
        <view class="picker">{{devArr[devIdx]}}</view>
      </picker>
    </l-form-item>
    <l-button size="long" @lintap="onComputeOnYear" type="default">按年统计</l-button>
    <l-button size="long" @lintap="onComputeOnMonth" type="warning">按月统计</l-button>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import { CompanyModel } from "../../models/Company";

export default {
  name: "Chart",
  components: {},
  data() {
    return {
      dev_id: 1,
      dept_id: 13,
      date: "2020-1",

      deptInfos: [],
      devInfos: [],
      deptArr: [],
      devArr: [],
      devIdx: 0,
      deptIdx: 0
    };
  },
  async onLoad() {
    const sys_option = Taro.getStorageSync("sys_info");
    const company = new CompanyModel(sys_option);
    let [deptInfos, deptArr, devInfos, devArr] = await company.getDevidedInfo();
    this.deptInfos = deptInfos;
    this.devInfos = devInfos;
    this.deptArr = deptArr;
    this.devArr = devArr;
  },
  methods: {
    bindDateChange(e) {
      this.date = e.detail.value;
    },
    bindDeptPickerChange(e) {
      this.deptIdx = e.detail.value;
    },
    bindDevPickerChange(e) {
      this.devIdx = e.detail.value;
    },
    async onComputeOnYear() {
      const sys_option = Taro.getStorageSync("sys_info");
      let option = {
        comp_id: sys_option.id,
        dept_id: this.deptInfos[this.deptIdx].dept_id,
        dev_id: this.devInfos[this.devIdx].dev_id,
        year: this.date.split("-")[0]
      };
      Taro.navigateTo({
        url:
          "/pages/statisics/statisics?statisicsOption=" + JSON.stringify(option)
      });
    },
    async onComputeOnMonth() {
      const sys_option = Taro.getStorageSync("sys_info");
      console.log(this.deptInfos);
      let option = {
        comp_id: sys_option.id,
        dept_id: this.deptInfos[this.deptIdx].dept_id,
        dev_id: this.devInfos[this.devIdx].dev_id,
        year: this.date.split("-")[0],
        month: this.date.split("-")[1]
      };
      Taro.navigateTo({
        url:
          "/pages/statisics/statisics?statisicsOption=" + JSON.stringify(option)
      });
    }
  }
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
</style>
