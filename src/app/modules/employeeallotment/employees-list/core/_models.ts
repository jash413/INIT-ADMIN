import {ID, Response} from '../../../../../_metronic/helpers'
export type Employee = {
  CUS_CODE?: string,
  EMP_CODE?: ID,
  EMP_NAME?: string,
  EMP_PASS?: string,
  EMP_IMEI?: string,
  MOB_NMBR?: string,
  EMP_ACTV?: string,
  SYN_DATE?: string,
  EMP_MAIL?: string,
  SUB_CODE?: string,
  USR_TYPE?: string,
  REGDATE?: string,
  SUB_STDT?: string,
  SUB_ENDT?: string,
  REG_TOKEN?: string,
  DEVICE_ID?: string,
  STATUS?: string,
  SALE_OS_ACTIVE?: string,
  PUR_OS_ACTIVE?: string,
  SALE_ORDER_ACTIVE?: string,
  PURCHASE_ORDER_ACTIVE?: string,
  SALE_ORDER_ENTRY?: string,
  SALE_REPORT_ACTIVE?: string,
  PURCHASE_REPORT_ACTIVE?: string,
  LEDGER_REPORT_ACTIVE?: string,
  CREATED_AT?: string,
  ad_id?: string,
  admin_name?: string,
  customer_name?: string,
  currentEmployeeNumber?: string,
}

export type EmployeesQueryResponse = Response<Array<Employee>>
