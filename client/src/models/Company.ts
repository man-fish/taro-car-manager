import Taro from "@tarojs/taro";
import { BaseModel } from "./Base";
import {
  IComp,
  ICompOption,
  IMultipleInfo,
  IDeptInfo,
  IDevInfo
} from "../interfaces/company";

export class CompanyModel extends BaseModel implements IComp {
  option: ICompOption;
  constructor(option: ICompOption) {
    super({
      getCompInfo: {
        url: "/android/getMsg",
        method: "POST"
      },
      getDeptInfo: {
        url: "/company/getMsg",
        method: "POST"
      }
    });
    this.option = option;
  }
  async getCompInfo() {
    const { code, msg, data } = await this.request(
      this.api.getCompInfo.url,
      this.api.getCompInfo.method,
      this.option
    );
    if (code.toString() !== "1") {
      Taro.showToast({
        title: "获取机构信息失败：" + msg,
        icon: "none",
        duration: 2000
      });
    }
    return data;
  }
  async getDeptInfo() {
    const { code, msg, data } = await this.request(
      this.api.getDeptInfo.url,
      this.api.getDeptInfo.method,
      this.option
    );
    if (code.toString() !== "1") {
      Taro.showToast({
        title: "获取工区信息失败：" + msg,
        icon: "none",
        duration: 2000
      });
    }
    return data;
  }
  async getDevidedInfo(): Promise<
    [IDeptInfo[], string[], IDevInfo[], string[]]
  > {
    const data = await this.getDeptInfo();
    let multiInfos: IMultipleInfo[] = data;
    let deptInfos: IDeptInfo[] = [];
    let devInfos: IDevInfo[] = [];
    let deptArr: string[] = [];
    let devArr: string[] = [];
    let latestDeptId = -1;
    for (let info of multiInfos) {
      if (latestDeptId !== info.dept_id) {
        let deptInfo: IDeptInfo = {
          dept_id: info.dept_id,
          deptname: info.deptname
        };
        deptArr.push(info.deptname);
        deptInfos.push(deptInfo);
      }

      let devInfo: IDevInfo = {
        dev_id: info.dev_id,
        devname: info.devname
      };
      devArr.push(info.devname);
      devInfos.push(devInfo);
      latestDeptId = info.dept_id;
    }

    return [deptInfos, deptArr, devInfos, devArr];
  }
}
