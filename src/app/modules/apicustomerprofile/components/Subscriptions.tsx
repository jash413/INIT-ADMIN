import { FC, useEffect, useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { ApiSubscriptionCard } from "../../../../_metronic/partials/content/cards/ApiSubscriptionCard";
import {
  getSubscriptions,
  searchSubscriptions,
  deleteSubscription,
} from "../subscriptionCore/_requests";
import { getCustomerById } from "../../apicustomers/customers-list/core/_requests";
import { Subscription } from "../subscriptionCore/_models";
import moment from "moment";
import { SubscriptionEditModalForm } from "./SubscriptionEditModalForm";
import { useDebounce, KTIcon } from "../../../../_metronic/helpers";
import { CustomersListFilter } from "./CustomersSubscriptionListFilter";

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
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    getCustomerById(id).then((data) => {
      setCustomer(data);
    });
  }, [id]);

  useEffect(() => {
    if (customer && customer.REG_CODE) {
      fetchSubscriptions();
    }
  }, [customer]);

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
      const data = await getSubscriptions(
        `filter_gst_code=${customer.REG_CODE}`
      );
      setSubscriptions(data.data);
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

  const handleDeleteSubscription = async (subscription: Subscription) => {
    try {
      const warning = window.confirm(
        `Are you sure you want to delete subscription ${subscription.id}?`
      );
      if (!warning) return;
      await deleteSubscription(subscription.id);
      fetchSubscriptions();
    } catch (error) {
      console.error("Delete Subscription Error:", error);
    }
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
          <CustomersListFilter
            REG_CODE={customer?.REG_CODE}
            setSubscription={setSubscriptions}
          />
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
              <div key={subscription.id} className="col-md-6 col-xl-4">
                <ApiSubscriptionCard
                  badgeColor={
                    subscription.is_active === 1 ? "success" : "danger"
                  }
                  status={subscription.is_active === 1 ? "Active" : "Inactive"}
                  startDate={moment(subscription?.SUBSCRIPTION_DATE).format(
                    "DD/MM/YYYY"
                  )}
                  endDate={moment(subscription?.expiry_date).format(
                    "DD/MM/YYYY"
                  )}
                  invoiceDate={moment(subscription?.INV_DATE).format(
                    "DD/MM/YYYY"
                  )}
                  invoiceNumber={subscription?.INV_NO}
                  allotedCalls={subscription?.ALLOTED_CALLS}
                  usedCalls={subscription?.USED_CALLS}
                  pendingCalls={subscription?.PENDING_CALLS}
                  handleEditSubscription={handleEditSubscription}
                  handleDeleteSubscription={handleDeleteSubscription}
                  subscription={subscription}
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
          customerId={customer.REG_CODE}
        />
      )}
    </Content>
  );
};

export { Subscriptions };
