import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { KTIcon } from "../../../_metronic/helpers";
import { Content } from "../../../_metronic/layout/components/content";
import { getUserById } from "../customers/users-list/core/_requests";
import { getSubscriptionById } from "../subscriptions/subscriptions-list/core/_requests";

interface ProfileHeaderProps {
  id: string;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ id }) => {
  const location = useLocation();
  const { pathname } = location;
  const [customer, setCustomer] = useState<any>({});
  const [subscriptions, setSubscriptions] = useState<any>([]);

  useEffect(() => {
    getUserById(id).then(async (data) => {
      setCustomer(data);
    });
    getSubscriptionById(id).then(async (data) => {
      setSubscriptions(data);
    });
  }, [id]);

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
                        {customer?.CUS_NAME}
                      </a>
                    </div>

                    <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                      <a
                        href={`tel:${customer?.PHO_NMBR}`}
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <KTIcon
                          iconName="profile-circle"
                          className="fs-4 me-1"
                        />
                        {customer?.PHO_NMBR}
                      </a>
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <KTIcon iconName="geolocation" className="fs-4 me-1" />
                        {customer?.CUS_ADDR}
                      </a>
                      <a
                        href={`mailto:${customer?.CUS_MAIL}`}
                        className="d-flex align-items-center text-gray-500 text-hover-primary mb-2"
                      >
                        <KTIcon iconName="sms" className="fs-4 me-1" />
                        {customer?.CUS_MAIL}
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
                            {subscriptions?.length}
                          </div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">
                          Subscriptions
                        </div>
                      </div>

                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <div className="fs-2 fw-bolder">
                            {customer?.USR_NMBR}
                          </div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">Users</div>
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
                      (pathname === `/customer-profile/${id}/subscriptions` &&
                        "active")
                    }
                    to={`/customer-profile/${id}/subscriptions`}
                  >
                    Subscriptions
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (pathname === `/customer-profile/${id}/employees` &&
                        "active")
                    }
                    to={`/customer-profile/${id}/employees`}
                  >
                    Employees
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
