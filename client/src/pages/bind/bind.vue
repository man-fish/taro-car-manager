<template>
  <view class="bind-container">
    <view class="header-img">
      <image src="http://image.innoweb.cn/2020-07-09-bg.png"></image>
    </view>
    
    <l-form name="account">
      <l-form-item name="compuser" label-width="170rpx" label="用户名">
        <input type="text" v-model="compuser" placeholder="请输入用户名">
      </l-form-item>
      <l-form-item name="comppass" label-width="170rpx" label="密码" >
        <input type="text" v-model="comppass" placeholder="请输入密码" >
      </l-form-item>
      <l-button type="default" size="long" @lintap="onAccountBind">绑定微信小程序</l-button>
    </l-form>
  </view>
</template>

<script>
import { AccountModel } from "../../models/Account";
import Taro from "@tarojs/taro";
const account = new AccountModel();

export default {
  name: "Bind",
  components: {},
  data() {
    return {
      compuser: "",
      comppass: ""
    };
  },
  methods: {
    onInputUser(value) {
      console.log(1)
      this.compuser = value
    },
    async onAccountBind() {
      console.log(this.compuser)
      const { code, msg } = await account.bindAccount(
        this.compuser,
        this.comppass
      );
      if (code.toString() !== "0") {
        Taro.switchTab({
          url: "/pages/profile/profile"
        });
      } else {
        Taro.showModal({
          title: "账号绑定失败",
          content: msg,
          success: function(res) {
            if (res.confirm) {
              console.log("用户点击确定");
            } else {
              console.log("用户点击取消");
            }
          }
        });
      }
    }
  }
};
</script>

<style>
.bind-container {
  display: flex;
  flex-direction: column;
  height: 400rpx;
}
.header-img {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50rpx 0;
}

.header-img image {
  width: 300rpx;
  height: 300rpx;
}

.form-footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 30rpx;
}

.label-text>view {
    font-size: 16px !important;
}

input {
    font-size: 25px !important;
}
</style>
