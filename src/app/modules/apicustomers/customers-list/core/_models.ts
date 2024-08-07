import { ID, Response } from "../../../../../_metronic/helpers";
export type Customer = {
  id?: ID;
  REG_CODE?: string;
  CUS_NAME?: string;
  CUS_ADDR?: string;
  CMP_NAME?: string;
  notification_date?: string;
  CREATED_BY?: string;
  created_on?: string;
};

export type CustomersQueryResponse = Response<Array<Customer>>;
