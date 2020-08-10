import Taro from "@tarojs/taro";
import { BaseModel } from "./Base";
import { IResponse } from "../interfaces/response";
import {
  ICardLogStatistics,
  ICardLogStatisticsOption,
  ICardLogStatisticsByDurationOption,
  ICardDailyInfo
} from "../interfaces/log";
export class LogModel extends BaseModel {
  constructor() {
    super({
      getCardLog: {
        url: "/cardlog/getLog",
        method: "post"
      },
      getYearLogStatistics: {
        url: "/cardlog/year",
        method: "post"
      },
      getMonthLogStatistics: {
        url: "/cardlog/month",
        method: "post"
      },
      getCardLogStatisticsByDuration: {
        url: "/cardlog/byDay",
        method: "post"
      },
      getCardLogStatisticsByDurationByCard: {
        url: "/cardlog/byCardnum",
        method: "post"
      }
    });
  }
  async getCardLog({
    createtime,
    logdt,
    id,
    compsk,
    compvk,
    deptid,
    devnum,
    cardname,
    page,
    rows
  }) {
    const { code, msg, data, total } = await this.request(
      this.api.getCardLog.url,
      this.api.getCardLog.method,
      {
        // 机构认证
        comp_id: id,
        compsk,
        compvk,
        // 时间范围筛选
        createtime,
        logdt,
        // 非必须字段筛选
        deptid,
        devnum,
        cardname,
        page,
        rows
      }
    );
    if (code.toString() !== "1") {
      Taro.showToast({
        title: "获取车卡记录失败：" + msg,
        icon: "none",
        duration: 2000
      });
    }
    return {
      total,
      data
    };
  }
  async getCardLogStatistics(
    option: ICardLogStatisticsOption
  ): Promise<ICardLogStatistics> {
    let res: IResponse;
    if (option.month) {
      res = await this.request(
        this.api.getMonthLogStatistics.url,
        this.api.getMonthLogStatistics.method,
        option
      );
    } else {
      res = await this.request(
        this.api.getYearLogStatistics.url,
        this.api.getYearLogStatistics.method,
        option
      );
    }
    let { code, msg, data } = res;
    if (code.toString() !== "1") {
      Taro.showToast({
        title: "获取统计信息失败：" + msg,
        icon: "none",
        duration: 2000
      });
    }
    return data;
  }
  async getCardLogStatisticsByDuration(
    option: ICardLogStatisticsByDurationOption
  ): Promise<ICardDailyInfo[]> {
    let url = this.api.getCardLogStatisticsByDuration.url;
    let method = this.api.getCardLogStatisticsByDuration.method;
    if (option.isComputedForCard) {
      url = this.api.getCardLogStatisticsByDurationByCard.url;
      method = this.api.getCardLogStatisticsByDurationByCard.method;
    }

    let { code, msg, data } = await this.request(url, method, option);
    if (code.toString() !== "1") {
      Taro.showToast({
        title: "获取统计信息失败：" + msg,
        icon: "none",
        duration: 2000
      });
    }
    return data;
  }
}
