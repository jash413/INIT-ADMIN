import {ID, Response} from '../../../../../_metronic/helpers'
export type Employee = {
  CUS_CODE?: string,
  EMP_CODE?: ID,
  EMP_NAME?: string,
  EMP_PASS?: string,
  EMP_IMEI?: string,
  MOB_NMBR?: string,
  EMP_ACTV?: boolean,
  SYN_DATE?: string,
  EMP_MAIL?: string,
  SUB_CODE?: string,
  USR_TYPE?: boolean,
  REGDATE?: string,
  SUB_STDT?: string,
  SUB_ENDT?: string,
  REG_TOKEN?: string,
  DEVICE_ID?: string,
  STATUS?: boolean,
  SALE_OS_ACTIVE?: boolean,
  PUR_OS_ACTIVE?: boolean,
}

export type EmployeesQueryResponse = Response<Array<Employee>>
