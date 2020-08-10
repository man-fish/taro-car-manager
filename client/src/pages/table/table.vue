<template>
  <view class="list-container">
    <view class="title">车卡记录表</view>
    <table :headers="tableHeader" :data="row" :stripe="stripe" :border="border" />
  </view>
</template>

<script>
export default {
  name: "List",
  components: {},
  data() {
    return {
      tableHeader: [
        {
          prop: "datetime",
          width: 150,
          label: "日期",
          color: "#55C355"
        },
        {
          prop: "sign_in",
          width: 152,
          label: "上班时间"
        },
        {
          prop: "sign_out",
          width: 152,
          label: "下班时间"
        },
        {
          prop: "work_hour",
          width: 110,
          label: "工时"
        },
        {
          prop: "statusText",
          width: 110,
          label: "状态"
        }
      ],
      stripe: true,
      border: true,
      outBorder: true,
      row: [
        {
          id: 1,
          status: "正常",
          datetime: "04-01",
          sign_in_time: "09:30:00",
          sign_out_time: "18:30:00",
          work_hour: 8
        },
        {
          id: 2,
          status: "迟到",
          datetime: "04-02",
          sign_in_time: "10:30:00",
          sign_out_time: "18:30:00",
          work_hour: 7
        },
        {
          id: 29,
          status: "正常",
          datetime: "04-03",
          sign_in_time: "09:30:00",
          sign_out_time: "18:30:00",
          work_hour: 8
        },
        {
          id: 318,
          status: "休息日",
          datetime: "04-04",
          sign_in_time: "",
          sign_out_time: "",
          work_hour: ""
        },
        {
          id: 319,
          status: "正常",
          datetime: "04-05",
          sign_in_time: "09:30:00",
          sign_out_time: "18:30:00",
          work_hour: 8
        }
      ],
      msg: "暂无数据"
    };
  },
  onLoad: function(options) {},
  methods: {
    bindtap(item) {
      wx.navigateTo({
        url: "/pages/log/log?logInfo=" + JSON.stringify(item)
      });
    },
    /**
     * 点击表格一行
     */
    onRowClick: function(e) {
      console.log("e: ", e);
    }
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

.content-item text {
  color: #111;
}

.list-item-footer {
  display: flex;
  justify-content: flex-end;
  padding: 5px 13px 6px 5px;
  background: #3963bc;
  box-sizing: border-box;
}

.footer-date {
  font-size: 18px;
  color: white;
}
</style>
