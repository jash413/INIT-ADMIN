import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { KTIcon } from "../../../_metronic/helpers";
import { Content } from "../../../_metronic/layout/components/content";
import { getCustomerById } from "../apicustomers/customers-list/core/_requests";
import { getSubscriptions } from "./subscriptionCore/_requests";
import { getUserById } from "./userCore/_requests";

interface ProfileHeaderProps {
  id: string;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ id }) => {
  const location = useLocation();
  const { pathname } = location;
  const [customer, setCustomer] = useState<any>({});
  const [subscriptions, setSubscriptions] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    getCustomerById(id).then(async (data) => {
      setCustomer(data);
    });
  }, [id]);

  useEffect(() => {
    if (customer.REG_CODE === undefined) return;
    getUserById(customer.REG_CODE).then(async (data) => {
      setUsers(data);
    });
    getSubscriptions(`filter_gst_code=${customer.REG_CODE}`).then(
      async (data) => {
        setSubscriptions(data?.data);
      }
    );
  }, [customer.REG_CODE]);

  return (
    <>
      <Content>
        <div className="card mb-5 mb-xl-10">
          <div className="card-body pt-9 pb-0">
            <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-2">
                      <a
                        href="#"
                        className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                      >
                        {customer?.CUS_NAME} - {customer?.REG_CODE}
                      </a>
                    </div>

                    <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <KTIcon iconName="geolocation" className="fs-4 me-1" />
                        {customer?.CUS_ADDR}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap flex-stack">
                  <div className="d-flex flex-column flex-grow-1 pe-8">
                    <div className="d-flex flex-wrap">
                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <div className="fs-2 fw-bolder">
                            {
                              subscriptions?.filter(
                                (subscription: any) =>
                                  subscription.is_active === 1
                              ).length
                            }
                          </div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">
                          Active Subscriptions
                        </div>
                      </div>
                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <div className="fs-2 fw-bolder">
                            {
                              subscriptions?.filter(
                                (subscription: any) =>
                                  subscription.is_active === 0
                              ).length
                            }
                          </div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">
                          Inactive Subscriptions
                        </div>
                      </div>
                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <div className="fs-2 fw-bolder">
                            {
                              users?.filter((user: any) => user.USR_ACTV === 1)
                                .length
                            }
                          </div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">
                          Active Users
                        </div>
                      </div>
                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <div className="fs-2 fw-bolder">
                            {
                              users?.filter((user: any) => user.USR_ACTV === 0)
                                .length
                            }
                          </div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">
                          Inactive Users
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex overflow-auto h-55px">
              <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
                <li className="nav-item">
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (pathname ===
                        `/api-customer-profile/${id}/subscriptions` && "active")
                    }
                    to={`/api-customer-profile/${id}/subscriptions`}
                  >
                    Subscriptions
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (pathname === `/api-customer-profile/${id}/users` &&
                        "active")
                    }
                    to={`/api-customer-profile/${id}/users`}
                  >
                    Users
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export { ProfileHeader };
