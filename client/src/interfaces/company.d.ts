export interface ICompOption {
  id: number;
  compsk: string;
  compvk: string;
}

export interface IComp {
  option: ICompOption;
}

export interface ICompInfo {
  compaddr: string; // 自营机构地址
  compname: string; // 自营机构
  card: number; // 车卡数
  dept: number; // 工区数
  dev: number; // 设备数
}

export interface IMultipleInfo extends IDeptInfo, IDevInfo {}

export interface IDevInfo {
  dev_id: number; // 1
  devname: string; // "自营设备1"
}

export interface IDeptInfo {
  dept_id: number; // 1
  deptname: string; // "测试工区11"

  // comp_id: number; // "1"
  // compname: string; // "自营机构"
  // deptaddr: string; // "测试工区地址11"
  // deptswitch: number; // 1
  // devjson: string; // "{"1212":"1221"}"
  // devswitch: number; // 1
  // devtime: number; //1591869258
}
