import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import {
  TablesWidget5,
  CardsWidget17,
} from "../../../_metronic/partials/widgets";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import { getAllUsers } from "../../modules/customers/users-list/core/_requests";
import { getAllSubscriptions } from "../../modules/customerprofile/subscriptionCore/_requests";
import { getAllEmployees } from "../../modules/customerprofile/employeeCore/_requests";
import moment from "moment";

interface DashboardPageProps {
  noOfActiveSubscriptions: number;
  noOfInactiveSubscriptions: number;
  noOfActiveEmployees: number;
  noOfInactiveEmployees: number;
  noOfActiveCustomers: number;
  noOfInactiveCustomers: number;
  noOfActiveToday: number;
  noOfActiveWeekly: number;
  noOfActiveMonthly: number;
  noOfInactiveToday: number;
  noOfInactiveWeekly: number;
  noOfInactiveMonthly: number;
}

const DashboardPage: FC<DashboardPageProps> = ({
  noOfActiveSubscriptions,
  noOfInactiveSubscriptions,
  noOfActiveEmployees,
  noOfInactiveEmployees,
  noOfActiveCustomers,
  noOfInactiveCustomers,
  noOfActiveToday,
  noOfActiveWeekly,
  noOfActiveMonthly,
  noOfInactiveToday,
  noOfInactiveWeekly,
  noOfInactiveMonthly,
}) => (
  <>
    <ToolbarWrapper />
    <Content>
      {/* begin::Row */}
      <div className="row gy-5 g-xl-8">
        <div className="col-xl-4">
          <CardsWidget17
            active={noOfActiveSubscriptions}
            inactive={noOfInactiveSubscriptions}
            type="Subscriptions"
            chartName="NO OF SUBSCRIPTIONS"
            className="card-xxl-stretch mb-5 mb-xl-8"
          />
        </div>
        <div className="col-xl-4">
          <CardsWidget17
            active={noOfActiveCustomers}
            inactive={noOfInactiveCustomers}
            type="Customers"
            chartName="NO OF CUSTOMERS"
            className="card-xxl-stretch mb-5 mb-xl-8"
          />
        </div>
        <div className="col-xl-4">
          <CardsWidget17
            active={noOfActiveEmployees}
            inactive={noOfInactiveEmployees}
            type="Employees"
            chartName="NO OF EMPLOYEES"
            className="card-xxl-stretch mb-5 mb-xl-8"
          />
        </div>
      </div>
      <div className="row gy-5 g-xl-8">
        <div className="col-xl-4">
          <CardsWidget17
            active={noOfActiveToday}
            inactive={noOfInactiveToday}
            type="Subscriptions"
            chartName="TODAY'S SUBSCRIPTIONS"
            className="card-xxl-stretch mb-5 mb-xl-8"
          />
        </div>
        <div className="col-xl-4">
          <CardsWidget17
            active={noOfActiveWeekly}
            inactive={noOfInactiveWeekly}
            type="Subscriptions"
            chartName="WEEKLY SUBSCRIPTIONS"
            className="card-xxl-stretch mb-5 mb-xl-8"
          />
        </div>
        <div className="col-xl-4">
          <CardsWidget17
            active={noOfActiveMonthly}
            inactive={noOfInactiveMonthly}
            type="Subscriptions"
            chartName="MONTHLY SUBSCRIPTIONS"
            className="card-xxl-stretch mb-5 mb-xl-8"
          />
        </div>
      </div>
      {/* end::Row */}

      <div className="row g-5 gx-xxl-8">
        <TablesWidget5 className="card-xxl-stretch mb-5 mb-xxl-8" />
      </div>
    </Content>
  </>
);

const DashboardWrapper: FC = () => {
  const [noOfActiveSubscriptions, setNoOfActiveSubscriptions] = useState(0);
  const [noOfActiveEmployees, setNoOfActiveEmployees] = useState(0);
  const [noOfActiveCustomers, setNoOfActiveCustomers] = useState(0);
  const [noOfInactiveSubscriptions, setNoOfInactiveSubscriptions] = useState(0);
  const [noOfInactiveEmployees, setNoOfInactiveEmployees] = useState(0);
  const [noOfInactiveCustomers, setNoOfInactiveCustomers] = useState(0);
  const [noOfActiveToday, setNoOfActiveToday] = useState(0);
  const [noOfActiveWeekly, setNoOfActiveWeekly] = useState(0);
  const [noOfActiveMonthly, setNoOfActiveMonthly] = useState(0);
  const [noOfInactiveToday, setNoOfInactiveToday] = useState(0);
  const [noOfInactiveWeekly, setNoOfInactiveWeekly] = useState(0);
  const [noOfInactiveMonthly, setNoOfInactiveMonthly] = useState(0);

  const fetchAllData = async () => {
    try {
      const users = await getAllUsers();
      const subscriptions = await getAllSubscriptions();
      const employees = await getAllEmployees();

      const today = moment().startOf("day");
      const startOfWeek = moment().startOf("week");
      const startOfMonth = moment().startOf("month");
      const endOfToday = moment().endOf("day");
      const endOfWeek = moment().endOf("week");
      const endOfMonth = moment().endOf("month");

      const activeSubscriptions = subscriptions.data.filter((s: any) => s.status === 1);
      const inactiveSubscriptions = subscriptions.data.filter((s: any) => s.status === 0);

      setNoOfActiveToday(
        activeSubscriptions.filter((s: any) => moment(s.CREATED_AT).isBetween(today, endOfToday)).length
      );
      setNoOfActiveWeekly(
        activeSubscriptions.filter((s: any) => moment(s.CREATED_AT).isBetween(startOfWeek, endOfWeek)).length
      );
      setNoOfActiveMonthly(
        activeSubscriptions.filter((s: any) => moment(s.CREATED_AT).isBetween(startOfMonth, endOfMonth)).length
      );
      setNoOfInactiveToday(
        inactiveSubscriptions.filter((s: any) => moment(s.CREATED_AT).isBetween(today, endOfToday)).length
      );
      setNoOfInactiveWeekly(
        inactiveSubscriptions.filter((s: any) => moment(s.CREATED_AT).isBetween(startOfWeek, endOfWeek)).length
      );
      setNoOfInactiveMonthly(
        inactiveSubscriptions.filter((s: any) => moment(s.CREATED_AT).isBetween(startOfMonth, endOfMonth)).length
      );

      setNoOfActiveSubscriptions(activeSubscriptions.length);
      setNoOfInactiveSubscriptions(inactiveSubscriptions.length);

      const activeEmployees = employees.data.filter((e: any) => e.EMP_ACTV === "1");
      const inactiveEmployees = employees.data.filter((e: any) => e.EMP_ACTV === "0" || e.EMP_ACTV === null);

      setNoOfActiveEmployees(activeEmployees.length);
      setNoOfInactiveEmployees(inactiveEmployees.length);

      const activeCustomers = users.data.filter((u: any) => u.is_active === 1);
      const inactiveCustomers = users.data.filter((u: any) => u.is_active === 0 || u.is_active === null);

      setNoOfActiveCustomers(activeCustomers.length);
      setNoOfInactiveCustomers(inactiveCustomers.length);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <DashboardPage
        noOfActiveSubscriptions={noOfActiveSubscriptions}
        noOfInactiveSubscriptions={noOfInactiveSubscriptions}
        noOfActiveEmployees={noOfActiveEmployees}
        noOfInactiveEmployees={noOfInactiveEmployees}
        noOfActiveCustomers={noOfActiveCustomers}
        noOfInactiveCustomers={noOfInactiveCustomers}
        noOfActiveToday={noOfActiveToday}
        noOfActiveWeekly={noOfActiveWeekly}
        noOfActiveMonthly={noOfActiveMonthly}
        noOfInactiveToday={noOfInactiveToday}
        noOfInactiveWeekly={noOfInactiveWeekly}
        noOfInactiveMonthly={noOfInactiveMonthly}
      />
    </>
  );
};

export { DashboardWrapper };
