import { ID, Response } from "../../../../../_metronic/helpers";
export type User = {
  id?: ID;
  GST_CODE?: string;
  GST_NMBR?: string;
  USR_ID?: string;
  USR_PASS?: string;
  USR_ACTV?: string;
  CREATED_ON?: string;
  CREATED_BY?: string;
  is_admin?: string;
  last_login?: string;
};

export type UsersQueryResponse = Response<Array<User>>;
