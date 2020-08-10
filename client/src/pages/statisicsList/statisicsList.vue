<template>
  <view class="list-container">
    <view class="title">
      车卡记录统计表
      <text class="tag">{{ duration }}</text>
    </view>
    <view class="table">
      <view class="table-title row">
        <view :class="{ msd: isByCard }">编号</view>
        <view :class="{ msd: isByCard }">{{
          isByCard ? "卡号" : "记录日期"
        }}</view>
        <view :class="{ msd: isByCard }" v-if="isByCard">车号</view>
        <view :class="{ msd: isByCard }">总计数</view>
      </view>
      <view class="row" v-for="(item, idx) in statisicsArr" :key="idx">
        <view :class="{ msd: isByCard }">{{ idx + 1 }}</view>
        <view :class="{ msd: isByCard }">{{
          isByCard
            ? item.cardnum
              ? item.cardnum
              : "????"
            : item.card_date
            ? item.card_date
            : "????"
        }}</view>
        <view :class="{ msd: isByCard }" v-if="isByCard">{{
          item.cardname ? item.cardname : "????"
        }}</view>
        <view :class="{ msd: isByCard }">{{
          item.count ? item.count : "????"
        }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { formatYear } from "../../utils/util";
import { LogModel } from "../../models/Log";

const cardLog = new LogModel();

export default {
  name: "List",
  components: {},
  data() {
    return {
      statisicsArr: [],
      isByCard: true,
      duration: ""
    };
  },
  onLoad: async function(option) {
    let statisicsOption = JSON.parse(option.statisicsOption);
    let duration =
      formatYear(new Date(statisicsOption.stime)) +
      "~" +
      formatYear(new Date(statisicsOption.etime));
    this.duration = duration;
    this.isByCard = statisicsOption.isComputedForCard;
    const data = await cardLog.getCardLogStatisticsByDuration(statisicsOption);
    let curDate = new Date(statisicsOption.stime);
    let yAxisRange = data.length;
    for (let i = 0; i < yAxisRange; i++) {
      curDate.setDate(curDate.getDate() + i);
      data[i].card_date = formatYear(new Date(curDate));
    }
    this.statisicsArr = data;
  }
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
  width: 100%;
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
  width: 33.333%;
  padding: 10px 15px;
  border-right: 1px solid #444;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.msd {
  width: 25%;
}

/* .sb {
  width: 10%;
  color: #3963bc;
}

.long {
  width: 30% !important;
} */

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
  flex-direction: row;
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
  min-height: 50px;
  /* 49% */
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

.tag {
  padding: 2px 10px;
  border-radius: 4px;
  color: #fff !important;
  background: #3963bc;
  font-size: 22px;
}
</style>
