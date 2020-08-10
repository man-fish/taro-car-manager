<template>
  <view class="log-container">
    <!-- cover -->
    <l-card type="cover" :image="headImg" image-mode="widthFix">
      <view class="title">记录详细信息</view>
      <view class="content">
        <!-- <view>图片：{{ logInfo.carpthoto }}</view> -->
        <!-- <view class="spliter">
          <image mode="widthFix" src="http://image.innoweb.cn/2020-07-10-3.png" ></image>
        </view>-->
        <view>
          车卡编号：
          <text class="tag">{{ logInfo.cardnum }}</text>
        </view>
        <view>
          车号：
          <text class="tag">{{ logInfo.cardname }}</text>
        </view>
        <view>
          机构名称：
          <text>{{ logInfo.compname }}</text>
        </view>
        <view>
          设备名称：
          <text>{{ logInfo.devname }}</text>
        </view>
        <view>
          工区名称：
          <text>{{ logInfo.deptname }}</text>
        </view>
        <!-- <view>
          记录时间：
          <text>{{ logInfo.logdt }}</text>
        </view>-->
        <view>
          创建时间：
          <text>{{ logInfo.createtime }}</text>
        </view>
      </view>
    </l-card>
  </view>
</template>

<script>
import { formatTime } from "../../utils/util";

export default {
  name: "Log",
  data() {
    return {
      logInfo: {},
      headImg: "",
    };
  },
  onLoad: function (options) {
    if (options && options.logInfo) {
      let info = JSON.parse(options.logInfo);
      this.logInfo = info;
      this.headImg = `https://car.zhuohang.tech/${info.carpthoto}`;
    } else {
      this.logInfo = {
        card_id: 1,
        cardnum: "111212",
        carpthoto: "https://car.zhuohang.tech",
        comp_id: 1,
        compname: "自营机构",
        createtime: formatTime(new Date(parseInt("1593583199"))),
        deletetime: null,
        dept_id: 13,
        deptname: "测试工区13",
        dev_id: 1,
        devname: "自营设备1",
        devnum: "61002",
        id: 1,
        logdt: formatTime(new Date(parseInt("1593583199"))),
        logstat: "1",
        logswitch: 1,
        uqnum: "1",
      };
    }
  },
  methods: {
    getTime(unixNano) {
      return formatTime(new Date(Number(unixNano + "000")));
    },
  },
};
</script>

<style>
.title {
  margin: 20px 0px 5px 0px;
  padding-left: 10px;
  height: 45px;
  border-left: #3963bc solid 8px;
  font-weight: 400;
  font-size: 28px;
  line-height: 45px;
  color: #333;
}

.content {
  /* border-top: 1px solid #999; */
  padding-top: 10px;
  padding-left: 20px;
  box-sizing: border-box;
  width: 100%;
}
.content view {
  line-height: 50px;
  font-size: 24px;
  color: #444;
}
.content view text {
  font-size: 22px;
  color: #777;
}

.spliter {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* padding-left: 10px; */
}

.spliter image {
  margin-top: -30px;
}

.tag {
  padding: 2px 10px;
  border-radius: 4px;
  color: #fff !important;
  background: #3963bc;
}
</style>
