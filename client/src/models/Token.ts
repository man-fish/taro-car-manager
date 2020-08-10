import Taro from "@tarojs/taro";
import config from "../configs/config";
import { IApiList } from "../interfaces/api";

export class TokenModel {
  public api: IApiList;
  constructor() {
    this.api = {
      fetchToken: {
        url: config.baseUrl + "/wechat/login",
        method: "POST"
      }
    };
  }
  fetchToken(callback?) {
    Taro.request({
      url: this.api.fetchToken.url,
      header: {
        "Content-Type": "application/json"
      },
      data: {
        wxuid: Taro.getStorageSync("uuid")
      },
      method: "POST",
      success: res => {
        const httpCode = res.statusCode.toString();
        if (httpCode.startsWith("2") && res.data) {
          if (res.data.code.toString() === "1") {
            const token = res.data.data ? res.data.data.token : "";
            const sysInfo = res.data.data ? res.data.data : {};
            Taro.setStorageSync("token", token);
            Taro.setStorageSync("sys_info", sysInfo);
            callback && callback(token);
          } else {
            Taro.showToast({
              title: "登录失败：" + res.data.msg,
              duration: 2000,
              icon: "none"
            });
          }
        } else {
          Taro.showToast({
            title: "请求失败：" + res.statusCode.toString(),
            duration: 2000,
            icon: "none"
          });
        }
      }
    });
  }
  static getToken(): string {
    const token = Taro.getStorageSync("token");
    return token ? token : "";
  }
}
