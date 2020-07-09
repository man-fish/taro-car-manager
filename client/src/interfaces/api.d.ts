export interface IApiList {
  [apiName: string]: {
    url: string;
    method: string;
  };
}
