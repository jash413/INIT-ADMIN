import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { KTIcon } from "../../../_metronic/helpers";
import { Content } from "../../../_metronic/layout/components/content";
import { getEmployeeById } from "../employeeallotment/employees-list/core/_requests";
import { getSubscriptionById } from "../subscriptions/subscriptions-list/core/_requests";
import { getUserById } from "../customers/users-list/core/_requests";
import moment from "moment";

interface ProfileHeaderProps {
  id: string;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ id }) => {
  const [subscription, setSubscription] = useState<any>(null);
  const [employees, setEmployees] = useState<any>([]);
  const [customer, setCustomer] = useState<any>({});

  useEffect(() => {
    getSubscriptionById(id).then((data) => {
      setSubscription(data);
    });
    getEmployeeById(id).then((data) => {
      setEmployees(data);
    });
  }, [id]);

  useEffect(() => {
    if (subscription) {
      getUserById(subscription.CUS_CODE).then((data) => {
        setCustomer(data);
      });
    }
  }, [subscription]);

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
                      <Link
                        to="#"
                        className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                      >
                        {subscription?.SUB_CODE}
                      </Link>
                    </div>

                    <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                      <Link
                        to={`/customer-profile/${subscription?.CUS_CODE}`}
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <KTIcon
                          iconName="profile-circle"
                          className="fs-4 me-1"
                        />
                        {customer?.CUS_NAME}
                      </Link>
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
                              employees?.filter((e: any) => e.EMP_ACTV === "1")
                                .length
                            }
                          </div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">
                          Active Employees
                        </div>
                      </div>
                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <div className="fs-2 fw-bolder">
                            {moment(subscription?.SUB_STDT).format(
                              "DD/MM/YYYY"
                            )}
                          </div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">
                          Start Date
                        </div>
                      </div>
                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <div className="fs-2 fw-bolder">
                            {moment(subscription?.SUB_ENDT).format(
                              "DD/MM/YYYY"
                            )}
                          </div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">
                          End Date
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export { ProfileHeader };
