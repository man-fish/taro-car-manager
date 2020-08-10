import Vue from "vue";
import Taro from "@tarojs/taro";

import { SystemModel } from "./models/System";
import { TokenModel } from "./models/Token";
import { AccountModel } from "./models/Account";

// Vue.config.productionTip = false

const App = new Vue({
  async onLaunch(options) {
    // 系统配置初始化
    const system = new SystemModel();
    const { code, msg } = await system.verifyExpired();
    if (code.toString() === "0") {
      Taro.showModal({
        title: "小程序启动失败",
        content: msg,
        success: function(res) {
          // 退出小程序
          Taro.navigateBack({
            delta: 1
          });
        }
      });
    }
    //云开发初始化
    wx.cloud.init({
      env: "carmanager-iv48n",
      traceUser: true
    });
    // 云开发鉴权获取用户信息
    Taro.cloud.callFunction({
      name: "getEncrytedInfo",
      complete: async res => {
        if (res.result) {
          Taro.setStorageSync("uuid", res.result.openid);
        }
        console.log("openid:", res.result.openid);
        // 获取配置系统配置信息和token
        const token = new TokenModel();
        token.fetchToken();
        // 账户绑定业务
        const account = new AccountModel();
        let isBind = await account.isAccountBinded();
        if (!isBind) {
          wx.navigateTo({
            url: "/pages/bind/bind"
          });
        }
      }
    });
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h("block", this.$slots.default);
  }
});

export default App;
