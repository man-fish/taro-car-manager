import { IApiList } from "../interfaces/api";
import { Http } from "../utils/Http";

export class BaseModel extends Http {
  protected api: IApiList;
  constructor(apiList: IApiList) {
    super();
    this.api = apiList;
  }
}
