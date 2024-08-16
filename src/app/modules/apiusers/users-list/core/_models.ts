import { ID, Response } from "../../../../../_metronic/helpers";
export type User = {
  id?: ID;
  GST_CODE?: string;
  GST_NMBR?: string;
  USR_ID?: string;
  USR_PASS?: string;
  USR_ACTV?: number;
  CREATED_ON?: string;
  CREATED_BY?: string;
  is_admin?: number;
  last_login?: string;
  CUS_NAME?: string;
};

export type UsersQueryResponse = Response<Array<User>>;
