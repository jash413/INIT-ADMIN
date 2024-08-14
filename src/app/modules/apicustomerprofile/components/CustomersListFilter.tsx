import { useEffect, useState } from "react";
import { MenuComponent } from "../../../../_metronic/assets/ts/components";
import { KTIcon } from "../../../../_metronic/helpers";
import {
  getAdmins,
  getSubscriptions,
  getGstSystem,
} from "../subscriptionCore/_requests";

interface CustomersListFilterProps {
  REG_CODE: string;
  setSubscription: (subscriptions: any[]) => void;
}

const CustomersListFilter: React.FC<CustomersListFilterProps> = ({
  REG_CODE,
  setSubscription,
}) => {
  const [from, setFrom] = useState<string | undefined>();
  const [to, setTo] = useState<string | undefined>();
  const [admin, setAdmin] = useState<string | undefined>();
  const [admins, setAdmins] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, updateState] = useState<any>("");
  const [gstSystems, setGstSystems] = useState<any[]>([]);
  const [sys, setSys] = useState<string | undefined>();

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  useEffect(() => {
    getAdmins().then((data) => {
      setAdmins(data.data);
    });
    getGstSystem().then((data) => {
      setGstSystems(data.data);
    });
  }, []);

  const resetData = () => {
    updateState("");
    setAdmin(undefined);
    setFrom(undefined);
    setTo(undefined);
  };

  const filterData = () => {
    const newQuery = {
      filter: {
        gst_code: REG_CODE,
        system_id: sys,
        created_by: admin,
        from: from,
        to: to,
      },
    };
    updateState(newQuery);
  };

  useEffect(() => {
    if (query.filter) {
      setIsLoading(true);
      const queryString = Object.entries(query.filter)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `filter_${key}=${value}`)
        .join("&");

      getSubscriptions(queryString)
        .then((data) => {
          setSubscription(data?.data || []);
        })
        .catch((error) => {
          console.error("Error fetching subscriptions:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      getSubscriptions(`filter_gst_code=${REG_CODE}`).then((data) => {
        setSubscription(data?.data || []);
      });
    }
  }, [query]);

  return (
    <>
      <button
        disabled={isLoading}
        type="button"
        className="btn btn-light-primary me-3"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
      >
        <KTIcon iconName="filter" className="fs-2" />
        Filter
      </button>
      <div
        className="menu menu-sub menu-sub-dropdown w-300px w-md-325px"
        data-kt-menu="true"
      >
        <div className="px-7 py-5">
          <div className="fs-5 text-gray-900 fw-bolder">Filter Options</div>
        </div>
        <div className="separator border-gray-200"></div>
        <div className="px-7 py-5" data-kt-customer-table-filter="form">
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Admin</label>
            <select
              className="form-select form-select-solid"
              name="admin"
              disabled={isLoading}
              onChange={(e) => setAdmin(e.target.value)}
            >
              <option value="">Select Admin</option>
              {admins?.map((admin) => (
                <option key={admin.ad_name} value={admin.ad_name}>
                  {admin.ad_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">GST System</label>
            <select
              className="form-select form-select-solid"
              name="sys"
              disabled={isLoading}
              onChange={(e) => setSys(e.target.value)}
            >
              <option value="">Select System</option>
              {gstSystems?.map((sys) => (
                <option key={sys.id} value={sys.id}>
                  {sys.system_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">From</label>
            <input
              type="date"
              className="form-control form-control-solid"
              name="from"
              disabled={isLoading}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">To</label>
            <input
              type="date"
              className="form-control form-control-solid"
              name="to"
              disabled={isLoading}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              disabled={isLoading}
              onClick={resetData}
              className="btn btn-light btn-active-light-primary fw-bold me-2 px-6"
              data-kt-menu-dismiss="true"
              data-kt-customer-table-filter="reset"
            >
              Reset
            </button>
            <button
              disabled={isLoading}
              type="button"
              onClick={filterData}
              className="btn btn-primary fw-bold px-6"
              data-kt-menu-dismiss="true"
              data-kt-customer-table-filter="filter"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { CustomersListFilter };
