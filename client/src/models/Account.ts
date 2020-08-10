import Taro from "@tarojs/taro";

import { BaseModel } from "./Base";

import { IResponse } from "../interfaces/response";

export class AccountModel extends BaseModel {
  constructor() {
    super({
      bindAccount: {
        url: "/wechat/firstBind",
        method: "post"
      },
      getAccountStatus: {
        url: "/wechat/isBind",
        method: "post"
      },
      existAccount: {
        url: "/wechat/logout",
        method: "post"
      }
    });
  }
  async bindAccount(compuser: string, comppass: string): Promise<IResponse> {
    const { code, msg, data }: IResponse = await this.request(
      this.api.bindAccount.url,
      this.api.bindAccount.method,
      {
        compuser,
        comppass,
        wxuid: Taro.getStorageSync("uuid")
      }
    );
    return { code, msg, data };
  }
  async isAccountBinded(): Promise<boolean> {
    const { code, msg, data }: IResponse = await this.request(
      this.api.getAccountStatus.url,
      this.api.getAccountStatus.method,
      {
        wxuid: wx.getStorageSync("uuid")
      }
    );

    return !!code ? true : false;
  }
  async existAccount(): Promise<boolean> {
    const { code, msg, data }: IResponse = await this.request(
      this.api.existAccount.url,
      this.api.existAccount.method,
      {
        wxuid: wx.getStorageSync("uuid")
      }
    );
    if (code.toString() !== "1") {
      Taro.showToast({
        title: "微信id解绑失败：" + msg,
        icon: "none",
        duration: 2000
      });
    }
    return !!code ? true : false;
  }
}
