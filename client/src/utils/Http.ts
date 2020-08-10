import Taro from "@tarojs/taro";
import config from "../configs/config";

import { TokenModel } from "../models/Token";

import { IResponse } from "../interfaces/response";

export class Http {
  request(url: string, method: string = "GET", data = {}): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      this._request(url, method.toUpperCase(), data, resolve, reject);
    });
  }
  private _request(
    url: string,
    method,
    data = {},
    resolve,
    reject,
    hasRefetched: boolean = false
  ) {
    Taro.request({
      url: config.baseUrl + url,
      method,
      data,
      header: {
        "Content-Type": "application/json",
        __token__: TokenModel.getToken()
      },
      success: res => {
        const httpCode = res.statusCode.toString();
        if (httpCode.startsWith("2")) {
          resolve(res.data);
        } else {
          if (httpCode === "403") {
            if (!hasRefetched) {
              this._refetch(url, method, data, resolve, reject, hasRefetched);
            }
          } else {
            reject();
            console.log(res.data);
            this._show_error(res.data.code, res.data.msg);
          }
        }
      },
      fail: err => {
        reject();
        this._show_error(0, "发生了一个错误");
      }
    });
  }
  private _refetch(...params) {
    const token = new TokenModel();
    token.fetchToken(token => {
      this._request(...params, true);
    });
  }
  private _show_error(errCode, errMsg) {
    Taro.showToast({
      title: "err_code：" + errCode + "；err_msg：" + errMsg,
      icon: "none",
      duration: 2000
    });
  }
}
