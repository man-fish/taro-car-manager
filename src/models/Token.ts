import Taro from "@tarojs/taro";
import config from "../configs/config";
import BaseModel from "Base";

export class TokenModel extends BaseModel {
  constructor() {
    super();
    super.api = {
      fetchToken: {
        url: config.baseUrl + "/wechat/login",
        method: "POST"
      }
    };
  }
  static getToken(): string {
    const token = Taro.getStorageSync("token");
    return token ? token : "";
  }
  fetchToken(callback) {
    Taro.request({
      url: super.api.fetchToken.url,
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
          }
        }
      }
    });
  }
}
