import Taro from "@tarojs/taro";

import { BaseModel } from "./Base";
import { IReponse } from "../interfaces/response";

export class AccountModel extends BaseModel {
  constructor() {
    super();
    super.api = {
      bindAccount: {
        url: "/wechat/firstBind",
        method: "post"
      },
      getAccountStatus: {
        url: "/wechat/isBind",
        method: "get"
      }
    };
  }
  async bindAccount(compuser: string, comppass: string): Promise<IReponse> {
    const { code, msg }: IReponse = await this.request(
      this.api.bindAccount.url,
      this.api.bindAccount.method,
      {
        compuser,
        comppass,
        wxuid: Taro.getStorageSync("uuid")
      }
    );
    return { code, msg };
  }
  async isAccountBinded() {
    // const { code, data } = await this.request(this.api.getAccountStatus.url, this.api.getAccountStatus.method, {
    //   wxuid: wx.getStorageSync('uuid')
    // })
    return true;
  }
}
