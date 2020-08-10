import Taro from "@tarojs/taro";

import { BaseModel } from "./Base";
import { IResponse } from "../interfaces/response";

export class SystemModel extends BaseModel {
  constructor() {
    super({
      getConfig: {
        url: "/config/getConfig",
        method: "GET"
      },
      getVersionInfo: {
        url: "/version/getVersion",
        method: "GET"
      }
    });
  }
  async getConfig(): Promise<IResponse> {
    const { code, msg, data }: IResponse = await this.request(
      this.api.getConfig.url,
      this.api.getConfig.method
    );
    if (code.toString() !== "1") {
      Taro.showToast({
        title: "获取系统配置失败：" + msg,
        icon: "none",
        duration: 2000
      });
    }
    return { code, msg, data };
  }
  async verifyExpired(): Promise<IResponse> {
    let { code, msg, data } = await this.getConfig();
    console.log(data);
    if (code && code.toString() !== "0") {
      if (data && data.stat_mp.toString() === "1") {
        if (data.stat_mpfee.toString() === "1") {
          code = "1";
          msg = "ok";
        } else {
          code = "0";
          msg = "当前用户已超过系统使用期！";
        }
      } else {
        code = "0";
        msg = "系统禁止当前设备访问数据！";
      }
    } else {
      code = "0";
      msg = "系统配置拉取失败！";
    }
    return {
      code,
      msg,
      data
    };
  }
  async getVersionInfo() {
    const { code, msg, data }: IResponse = await this.request(
      this.api.getVersionInfo.url,
      this.api.getVersionInfo.method
    );
    if (code.toString() !== "1") {
      Taro.showToast({
        title: "获取系统版本失败：" + msg,
        icon: "none",
        duration: 2000
      });
    }
    return data;
  }
}
