<template>
  <view class="list-container">
    <view class="title">车卡记录表</view>
    <view class="table">
      <view class="table-title row">
        <view class="sbtitle">编号</view>
        <view>车卡</view>
        <view>工区</view>
        <view class="medium">设备</view>
        <view class="long">记录日期</view>
      </view>
      <view class="row" v-for="(item, idx) in logArr" :key="idx" @tap="bindtap(item)" :value="item">
        <view class="sb">图片</view>
        <view>{{ item.cardname ? item.cardname : "????" }}</view>
        <view>{{ item.deptname ? item.deptname : "????" }}</view>
        <view class="medium">{{ item.devname ? item.devname : "????" }}</view>
        <view class="long">
          {{
          item.createtime ? getTime(item.createtime) : "????"
          }}
        </view>
      </view>
    </view>
    <!-- <view
      class="list-item"
      v-for="(item, idx) in logArr"
      :key="idx"
      @tap="bindtap(item)"
      :value="item"
    >
      <view class="list-item-content">
        <view class="content-item content-title"
          >车卡：{{ item.cardname }}</view
        >
        <view class="content-item">
          工区:
          <text>{{ item.deptname }}</text
          >&nbsp;| 设备:
          <text>{{ item.devname }}</text>
        </view>
      </view>
      <view class="list-item-footer">
        <view class="footer-date">{{ getTime(item.createtime) }}</view>
      </view>
    </view>-->
    <view class="controller">
      <l-button size="mini" @lintap="onPrev" type="default">上一页</l-button>
      <view class="table-footer">
        {{ `第` }}
        <text class="curpage">{{ this.searchOption.page }}</text>
        {{ `页/共` }}
        <text>{{ this.page }}</text>
        {{ `页 共` }}
        <text>{{ this.total }}</text>
        {{ `条记录` }}
      </view>
      <l-button size="mini" @lintap="onNext" type="default">下一页</l-button>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";

import config from "../../configs/config";

import { formatYear, formatMonthTime } from "../../utils/util";

import { LogModel } from "../../models/Log";

const carLog = new LogModel();
export default {
  name: "List",
  components: {},
  data() {
    return {
      logArr: [],
      searchOption: {},
      total: 0,
      page: 0,
    };
  },
  onLoad: async function (options) {
    if (options && options.searchOption) {
      this.searchOption = JSON.parse(options.searchOption);
      await this.getLog(this.searchOption);
    } else {
      this.logArr = [
        {
          cardname: "10010",
          deptname: "工区1",
          devname: "设备1",
          createtime: "2020-12-11 24:60:60",
        },
        {
          cardname: "10010",
          deptname: "工区1",
          devname: "设备1",
          createtime: "2020-12-11 24:60:60",
        },
        {
          cardname: "10010",
          deptname: "工区1",
          devname: "设备1",
          createtime: "2020-12-11 24:60:60",
        },
        {
          cardname: "10010",
          deptname: "工区1",
          devname: "设备1",
          createtime: "2020-12-11 24:60:60",
        },
      ];
    }
  },
  methods: {
    bindtap(item) {
      wx.navigateTo({
        url: "/pages/log/log?logInfo=" + JSON.stringify(item),
      });
    },
    getTime(stamp) {
      return formatMonthTime(new Date(stamp));
    },
    async onNext() {
      if (this.searchOption.page == this.page) {
        Taro.showToast({
          title: "已经是最后一页了",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      this.searchOption.page -= -1;
      await this.getLog(this.searchOption);
    },
    async onPrev() {
      if (this.searchOption.page == 1) {
        Taro.showToast({
          title: "已经是第一页了",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      this.searchOption.page -= 1;
      await this.getLog(this.searchOption);
    },
    async getLog(searchOption) {
      const { total, data } = await carLog.getCardLog(searchOption);
      this.logArr = data;
      this.total = total;
      this.page = Math.ceil(total / config.pagenation.rows);
      this.logArr.forEach((log) => {
        log.logdt = !Number(log.logdt)
          ? new Date(log.logdt)
          : new Date(Number(log.logdt + "000"));
        log.logdt = formatYear(log.logdt);
      });
    },
  },
};
</script>

<style>
.title {
  margin: 20px 0px 0px 0px;
  padding-left: 10px;
  height: 55px;
  border-left: #3963bc solid 8px;
  font-weight: 400;
  font-size: 28px;
  line-height: 55px;
  color: #444;
}

.table {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 750px;
  background: #fff;
  color: #444;
  margin-top: 20px;
  font-size: 22px;
  border-top: 1px solid #444;
  border-bottom: 1px solid #444;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #444;
}

.row view {
  width: 20%;
  padding: 10px 15px;
  border-right: 1px solid #444;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sbtitle {
  width: 15% !important;
}

.sb {
  width: 15% !important;
  color: #3963bc;
}

.medium {
  width: 25% !important;
}

.long {
  width: 30% !important;
}

.table-title {
  background: #3963bc;
  color: #fff;
  font-weight: 500;
}

.table-footer {
  margin: 0 20px;
  color: #666;
  font-size: 23px;
  font-weight: 20px;
}

.curpage {
  color: #3963bc;
}

.list-container {
  display: flex;
  flex-direction: columns;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0rpx 20rpx;
  box-sizing: border-box;
  width: 100%;
}

.list-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20rpx 0;
  /* padding: 12rpx 20rpx 18rpx 20rpx; */
  box-sizing: border-box;
  width: 100%;
  /* 49% */
  border-radius: 20px;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  border-color: rgba(223, 225, 229, 0);
}

.list-item-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  color: #3963bc;
  font-size: 32px;
}

.header-date {
  color: #666;
  font-weight: 400;
  font-size: 24px;
}

.list-item-content {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.content-item {
  margin-top: 5px;
  font-size: 21px;
  font-weight: 300;
}

.content-title {
  font-weight: 400;
  font-size: 26px;
  color: #3963bc;
}

.content-item text {
  color: #111;
}

.list-item-footer {
  display: flex;
  justify-content: flex-start;
  padding: 5px 0px 6px 13px;
  background: #3963bc;
  box-sizing: border-box;
}

.footer-date {
  font-size: 18px;
  color: white;
}

.controller {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}
</style>
