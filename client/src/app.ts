import Vue from "vue";
import Taro from "@tarojs/taro";

// Vue.config.productionTip = false

const App = new Vue({
  onLaunch(options) {
    //云开发初始化
    wx.cloud.init({
      env: "carmanager-iv48n",
      traceUser: true
    });
    // 云开发鉴权获取用户信息
    Taro.cloud.callFunction({
      name: "getEncrytedInfo",
      complete: res => {
        console.log("openid:", res);
      }
    });
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h("block", this.$slots.default);
  }
});

export default App;
