import { ID, Response } from "../../../../../../_metronic/helpers";
export type Subscription = {
  id?: ID;
  GST_CODE?: string;
  GST_NMBR?: string;
  SYSTEM_ID?: string;
  SUBSCRIPTION_ID?: string;
  SUBSCRIPTION_DATE?: string;
  ALLOTED_CALLS?: string;
  USED_CALLS?: string;
  PENDING_CALLS?: string;
  is_active?: number;
  created_on?: string;
  created_by?: string;
  user_id?: string;
  expiry_date?: string;
  INV_DATE?: string;
  INV_NO?: string;
  CUS_NAME?: string;
};

export type SubscriptionsQueryResponse = Response<Array<Subscription>>;
