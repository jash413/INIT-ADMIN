import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Content } from "../../../../_metronic/layout/components/content";
import { Card2 } from "../../../../_metronic/partials/content/cards/Card2";
import { getSubscriptionById } from "../../subscriptions/subscriptions-list/core/_requests";
import { Subscription } from "../../subscriptions/subscriptions-list/core/_models";
import moment from "moment";

interface SubscriptionsProps {
  id: string;
}

const Subscriptions: FC<SubscriptionsProps> = ({ id }) => {
  const [subscriptions, setSubscriptions] = useState<any>([]);
  useEffect(() => {
    getSubscriptionById(id).then(async (data) => {
      setSubscriptions(data);
    });
  }, [id]);

  return (
    <Content>
      <div className="d-flex flex-wrap flex-stack mb-6">
        <h3 className="fw-bolder my-2">Subscriptions</h3>

        <div className="d-flex flex-wrap my-2">
          <Link
            to={`/subscription-management/subscriptions`}
            className="btn btn-primary btn-sm"
          >
            New Subscription
          </Link>
        </div>
      </div>
      <div className="row g-6 g-xl-9">
        {subscriptions.map((subscription: Subscription) => (
          <div className="col-md-6 col-xl-4">
            <Card2
              badgeColor={subscription.status === 1 ? "success" : "danger"}
              status={subscription.status === 1 ? "Active" : "Inactive"}
              title={subscription.SUB_CODE}
              description={subscription?.PLA_CODE}
              startDate={moment(subscription?.SUB_STDT).format("DD/MM/YYYY")}
              endDate={moment(subscription?.SUB_ENDT).format("DD/MM/YYYY")}
              paymentDate={moment(subscription?.SUB_PDAT).format("DD/MM/YYYY")}
              licenseUsers={subscription?.LIC_USER}
            />
          </div>
        ))}
      </div>
    </Content>
  );
};

export { Subscriptions };
