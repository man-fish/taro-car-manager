<template>
  <view class="profile-container">
    <view class="profile-header">
      <view class="header-info">
        <view class="info-title">{{ compInfo.compname }}</view>
        <view class="info-desc">{{ compInfo.compaddr }}</view>
      </view>
      <view class="header-img"></view>
    </view>
    <view class="spliter">
      <image
        mode="widthFix"
        src="http://image.innoweb.cn/2020-07-10-3.png"
      ></image>
    </view>
    <view class="profile-content">
      <view class="card-box">
        {{ compInfo.dept }}
        <view class="box-title">工区数</view>
      </view>
      <view class="card-box">
        {{ compInfo.dev }}
        <view class="box-title">设备数</view>
      </view>
      <view class="card-box">
        {{ compInfo.card }}
        <view class="box-title">车卡数</view>
      </view>
    </view>

    <view class="version-box">
      <view class="title">系统版本信息</view>
      <view class="version-info">
        <view>
          系统版本：<text class="tag">{{ versionInfo.newversion }}</text>
        </view>
        <view>
          系统简介：<text>{{ versionInfo.content }}</text>
        </view>
        <view>
          创建时间：<text>{{ getTime(versionInfo.createtime) }}</text>
        </view>
        <view>
          更新时间：<text>{{ getTime(versionInfo.updatetime) }}</text>
        </view>
      </view>
    </view>
    <view class="center">
      <l-button size="long" @lintap="onExist" type="error">注销登录</l-button>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";

import { CompanyModel } from "../../models/Company";
import { SystemModel } from "../../models/System";
import { AccountModel } from "../../models/Account";

import { formatTime } from "../../utils/util";

export default {
  name: "Profile",
  data() {
    return {
      compInfo: {},
      versionInfo: {}
    };
  },
  components: {},
  async onLoad(option) {
    const sysOption = Taro.getStorageSync("sys_info");
    const company = new CompanyModel(sysOption);
    const system = new SystemModel();
    const data = await company.getCompInfo();
    this.compInfo = data;
    const versionInfo = await system.getVersionInfo();
    console.log(versionInfo);
    this.versionInfo = versionInfo[0];
  },
  methods: {
    getTime(unixNano) {
      return formatTime(new Date(Number(unixNano + "000")));
    },
    async onExist() {
      let account = new AccountModel();
      const res = await account.existAccount();
      res &&
        wx.navigateTo({
          url: "/pages/bind/bind"
        });
    }
  }
};
</script>

<style>
.title {
  margin: 20px 0px 20px 0px;
  padding-left: 10px;
  height: 55px;
  border-left: #3963bc solid 8px;
  font-weight: 400;
  font-size: 28px;
  line-height: 55px;
  color: #444;
}

.index {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.profile-header {
  height: 80px;
  padding: 15px 60px 70px 60px;
  /* border-bottom-left-radius: 40px; */
  /* border-bottom-right-radius: 40px; */
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  background: #3963bc;
  color: #fff;
}

.info-title {
  font-weight: 600;
  font-size: 35px;
}

.info-desc {
  font-weight: 500;
  font-size: 22px;
}

.profile-content {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 600px;
  margin: 0 auto;
}

.card-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 160px;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  color: #3963bc;
  font-size: 40px;
  font-weight: 600;
}

.box-title {
  padding-top: 10px;
  font-size: 22px;
  font-weight: 400;
  color: #333;
}

.spliter {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
}

.spliter image {
  width: 730rpx;
  /* transform: rotate(90deg); */
}

.version-box {
  width: 600px;
  margin: 40px auto;
}

.version-info {
  margin-top: 30px;
  padding-left: 20px;
  font-size: 24px;
  font-weight: 400;
  color: #555;
}

.version-info view {
  margin-top: 25px;
}

.version-info text {
  color: #777;
}

.tag {
  padding: 2px 10px;
  border-radius: 4px;
  color: #fff !important;
  background: #3963bc;
}

.center {
  margin-top: 75px;
  padding: 10px 70px;
  box-sizing: border-box;
}
</style>
