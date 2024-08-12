import { useEffect, useState } from "react";
import { MenuComponent } from "../../../../../../_metronic/assets/ts/components";
import { initialQueryState, KTIcon } from "../../../../../../_metronic/helpers";
import { useQueryRequest } from "../../core/QueryRequestProvider";
import { useQueryResponse } from "../../core/QueryResponseProvider";
import { getAdmins } from "../../core/_requests";

const CustomersListFilter = () => {
  const { updateState } = useQueryRequest();
  const { isLoading } = useQueryResponse();
  const [from, setFrom] = useState<string | undefined>();
  const [to, setTo] = useState<string | undefined>();
  const [admin, setAdmin] = useState<string | undefined>();
  const [admins, setAdmins] = useState<any[]>();

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  useEffect(() => {
    getAdmins().then((data) => {
      setAdmins(data.data);
    });
  }, []);

  const resetData = () => {
    updateState({ filter: undefined, ...initialQueryState });
  };

  const filterData = () => {
    updateState({
      filter: {
        created_by: admin,
        from,
        to,
      },
      ...initialQueryState,
    });
  };

  return (
    <>
      {/* begin::Filter Button */}
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
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div
        className="menu menu-sub menu-sub-dropdown w-300px w-md-325px"
        data-kt-menu="true"
      >
        {/* begin::Header */}
        <div className="px-7 py-5">
          <div className="fs-5 text-gray-900 fw-bolder">Filter Options</div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className="separator border-gray-200"></div>
        {/* end::Separator */}

        {/* begin::Content */}
        <div className="px-7 py-5" data-kt-customer-table-filter="form">
          {/* begin::Input group */}
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Admin</label>
            <select
              className="form-select form-select-solid"
              name="admin"
              disabled={isLoading}
              onChange={(e) => {
                setAdmin(e.target.value);
              }}
            >
              <option value="">Select Admin</option>
              {admins?.map((admin) => (
                <option key={admin.ad_name} value={admin.ad_name}>
                  {admin.ad_name}
                </option>
              ))}
            </select>
          </div>

          {/* begin::Input group */}
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">From</label>
            <input
              type="date"
              className="form-control form-control-solid"
              name="from"
              placeholder="From date"
              disabled={isLoading}
              onChange={(e) => {
                setFrom(e.target.value);
              }}
            />
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">To</label>
            <input
              type="date"
              className="form-control form-control-solid"
              name="to"
              placeholder="To date"
              disabled={isLoading}
              onChange={(e) => {
                setTo(e.target.value);
              }}
            />
          </div>

          {/* begin::Actions */}
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
          {/* end::Actions */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  );
};

export { CustomersListFilter };
