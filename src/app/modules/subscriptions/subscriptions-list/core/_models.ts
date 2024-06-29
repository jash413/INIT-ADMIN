import {ID, Response} from '../../../../../_metronic/helpers'
export type Subscription = {
  SUB_ID?: ID,
  SUB_CODE?: string,
  CUS_CODE?: string,
  PLA_CODE?: string,
  SUB_STDT?: string,
  SUB_ENDT?: string,
  LIC_USER?: number,
  SUB_PDAT?: string,
  SUB_ORDN?: string,
  status?: number,
  ORD_REQD?: number,
}

export type SubscriptionsQueryResponse = Response<Array<Subscription>>
