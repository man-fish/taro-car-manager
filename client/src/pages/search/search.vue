<template>
  <view class="search-container">
    <view class="title">车卡记录查询</view>
    <l-form-item name="createtime" label="起始时间" style="font-size:14px;" label-width="170rpx">
      <picker mode="date" @change="bindCreatetimeChange" v-model="createtime">
        <view class="picker">{{ createtime }}</view>
      </picker>
    </l-form-item>
    <l-form-item name="logdt" label="结束时间" style="font-size:14px;" label-width="170rpx">
      <picker mode="date" @change="bindLogdtChange" v-model="logdt">
        <view class="picker">{{ logdt }}</view>
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
      <l-button size="medium" @lintap="onSearchLog" type="default">查询</l-button>
    </view>
    <view class="blockquote">{{ msg }}</view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";

import config from "../../configs/config";

import { LogModel } from "../../models/Log";
import { CompanyModel } from "../../models/Company";

import { formatYear } from "../../utils/util";

const carLog = new LogModel();

export default {
  name: "Search",
  components: {},
  data() {
    return {
      createtime: "", // 起始时间
      logdt: "", // 结束时间
      cardname: "", // 车卡号
      tip: "fuck you",
      deptInfos: [],
      devInfos: [],
      deptArr: [],
      devArr: [],
      devIdx: 0,
      deptIdx: 0,

      id: "", // 设备编号
      compsk: "", // 机构sk
      compvk: "", // 机构vk
      dateRange: {
        start: "",
        end: "",
      },
      msg:
        "记录信息查询时间范围为起始日的00:00到结束日的23:59，筛选条件中工区和设备默认查询所有，车号可以输入部分车号进行模糊查询。",
    };
  },
  async onLoad(option) {
    const today = new Date();
    this.createtime = formatYear(today); // 起始时间
    this.logdt = formatYear(today); // 结束时间
    this.dateRange = {
      start: formatYear(today, -10),
      end: formatYear(today),
    };
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
    async onSearchLog() {
      const sysinfo = wx.getStorageSync("sys_info");
      sysinfo.comp_id = sysinfo.id;
      const searchOption = {
        createtime: this.createtime + " 00:00:00",
        logdt: this.logdt + " 23:59:59",
        deptid:
          this.deptArr[this.deptIdx] === "所有工区"
            ? ""
            : this.deptInfos[this.deptIdx - 1].dept_id,
        devnum:
          this.devArr[this.devIdx] === "所有设备"
            ? ""
            : this.devInfos[this.devIdx - 1].dev_id,
        cardname: this.cardname,
        page: config.pagenation.page,
        rows: config.pagenation.rows,
      };
      Object.assign(searchOption, sysinfo);
      console.log(searchOption);
      wx.navigateTo({
        url: "/pages/list/list?searchOption=" + JSON.stringify(searchOption),
      });
    },
    bindDeptPickerChange(e) {
      this.deptIdx = e.detail.value;
      console.log(this.deptInfos[this.deptIdx - 1]);
    },
    bindDevPickerChange(e) {
      this.devIdx = e.detail.value;
    },
    bindCreatetimeChange(e) {
      this.createtime = e.detail.value;
    },
    bindLogdtChange(e) {
      this.logdt = e.detail.value;
    },
    bindCardNameChange(e) {
      this.cardname = e.detail.value;
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

.search-container {
  display: flex;
  flex-direction: column;
}

.picker {
  padding-left: 25px;
  font-size: 27px;
  color: black;
}

.padRight {
  margin-top: 20px;
  padding: 0 30px;
  display: flex;
  flex: row;
  justify-content: flex-end;
}

.blockquote {
  position: relative;
  width: 80%;
  box-sizing: border-box;
  margin: 100px auto;
  border-width: 1px 0;
  border-color: #dcdcdc;
  border-style: solid;
  padding: 30px;
  font-size: 24px;
  font-weight: 300;
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
