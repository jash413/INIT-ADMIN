import { FC, useEffect, useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { Card2 } from "../../../../_metronic/partials/content/cards/Card2";
import {
  getSubscriptionById,
  searchSubscriptions,
} from "../subscriptionCore/_requests";
import { Subscription } from "../../subscriptions/subscriptions-list/core/_models";
import moment from "moment";
import { SubscriptionEditModalForm } from "./SubscriptionEditModalForm";
import { useDebounce, KTIcon } from "../../../../_metronic/helpers";

interface SubscriptionsProps {
  id: string;
}

const Subscriptions: FC<SubscriptionsProps> = ({ id }) => {
  const [subscriptions, setSubscriptions] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const debouncedSearchTerm = useDebounce(searchTerm, 150);

  useEffect(() => {
    fetchSubscriptions(); // Fetch subscriptions on initial load or ID change
  }, [id]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true); // Set loading to true before starting the search
      searchSubscriptions(debouncedSearchTerm, id)
        .then((data) => {
          setSubscriptions(data?.data || []);
        })
        .finally(() => {
          setLoading(false); // Set loading to false once the search is complete
        });
    } else {
      fetchSubscriptions(); // Re-fetch all subscriptions if search term is cleared
    }
  }, [debouncedSearchTerm]);

  const fetchSubscriptions = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const data = await getSubscriptionById(id);
      setSubscriptions(data);
    } catch (error) {
      console.error("Fetch Subscriptions Error:", error);
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  const handleNewSubscription = () => {
    setSelectedSubscription(null);
    setIsModalOpen(true);
  };

  const handleEditSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Content>
      <div className="d-flex flex-wrap flex-stack mb-6">
        <div className="d-flex align-items-center position-relative my-1">
          <KTIcon
            iconName="magnifier"
            className="fs-1 position-absolute ms-6"
          />
          <input
            type="text"
            data-kt-user-table-filter="search"
            className="form-control form-control-solid w-250px ps-14"
            placeholder="Search Subscription..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="d-flex flex-wrap my-2">
          <button
            onClick={handleNewSubscription}
            className="btn btn-primary btn-sm"
          >
            <KTIcon iconName="plus" className="fs-2" />
            New Subscription
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div> // Display loading indicator
      ) : (
        <div className="row g-6 g-xl-9">
          {subscriptions.length > 0 ? (
            subscriptions.map((subscription: Subscription) => (
              <div
                key={subscription.SUB_CODE}
                className="col-md-6 col-xl-4"
                onClick={() => handleEditSubscription(subscription)}
              >
                <Card2
                  badgeColor={subscription.status === 1 ? "success" : "danger"}
                  status={subscription.status === 1 ? "Active" : "Inactive"}
                  title={subscription.SUB_CODE}
                  description={subscription?.PLA_CODE}
                  startDate={moment(subscription?.SUB_STDT).format(
                    "DD/MM/YYYY"
                  )}
                  endDate={moment(subscription?.SUB_ENDT).format("DD/MM/YYYY")}
                  paymentDate={moment(subscription?.SUB_PDAT).format(
                    "DD/MM/YYYY"
                  )}
                  licenseUsers={subscription?.LIC_USER}
                />
              </div>
            ))
          ) : (
            <div className="text-center">No subscriptions found</div>
          )}
        </div>
      )}

      {isModalOpen && (
        <SubscriptionEditModalForm
          subscription={selectedSubscription || ({} as Subscription)}
          isSubscriptionLoading={false}
          onClose={handleCloseModal}
          onSubscriptionSaved={fetchSubscriptions}
        />
      )}
    </Content>
  );
};

export { Subscriptions };
