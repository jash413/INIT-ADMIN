import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import {
  TablesWidget5,
  CardsWidget17,
  ApiCard,
  ApiSubscriptionTable,
} from "../../../_metronic/partials/widgets";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import { getAllUsers } from "../../modules/customers/users-list/core/_requests";
import { getAllSubscriptions } from "../../modules/customerprofile/subscriptionCore/_requests";
import { getAllEmployees } from "../../modules/customerprofile/employeeCore/_requests";
import moment from "moment";
import { useAuth } from "../../modules/auth/core/Auth";
import { getAllCustomers } from "../../modules/apicustomers/customers-list/core/_requests";
import { getAllApiUsers } from "../../modules/apiusers/users-list/core/_requests";
import { getAllApiSubscriptions } from "../../modules/apisubscriptions/ewayeinvoice/subscriptions-list/core/_requests";

interface DashboardPageProps {
  noOfActiveSubscriptions: number;
  noOfInactiveSubscriptions: number;
  noOfActiveUsersOrEmployees: number;
  noOfInactiveUsersOrEmployees: number;
  noOfActiveCustomers: number;
  noOfInactiveCustomers: number;
  noOfActiveToday: number;
  noOfActiveWeekly: number;
  noOfActiveMonthly: number;
  noOfInactiveToday: number;
  noOfInactiveWeekly: number;
  noOfInactiveMonthly: number;
  type: string;
}

const DashboardPage: FC<DashboardPageProps> = ({
  noOfActiveSubscriptions,
  noOfInactiveSubscriptions,
  noOfActiveUsersOrEmployees,
  noOfInactiveUsersOrEmployees,
  noOfActiveCustomers,
  noOfInactiveCustomers,
  noOfActiveToday,
  noOfActiveWeekly,
  noOfActiveMonthly,
  noOfInactiveToday,
  noOfInactiveWeekly,
  noOfInactiveMonthly,
  type,
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
          {type === "IFAS" ? (
            <CardsWidget17
              active={noOfActiveCustomers}
              inactive={noOfInactiveCustomers}
              type="Customers"
              chartName="NO OF CUSTOMERS"
              className="card-xxl-stretch mb-5 mb-xl-8"
            />
          ) : (
            <ApiCard
              className="card-xxl-stretch mb-5 mb-xl-8"
              customers={noOfActiveCustomers}
              type="Customers"
              chartName="NO OF CUSTOMERS"
            />
          )}
        </div>
        <div className="col-xl-4">
          <CardsWidget17
            active={noOfActiveUsersOrEmployees}
            inactive={noOfInactiveUsersOrEmployees}
            type={type}
            chartName={`NO OF ${type.toUpperCase()}`}
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
        {type === "API Users" ? (
          <ApiSubscriptionTable className="card-xxl-stretch mb-5 mb-xxl-8" />
        ) : (
          <TablesWidget5 className="card-xxl-stretch mb-5 mb-xxl-8" />
        )}
      </div>
    </Content>
  </>
);

const DashboardWrapper: FC = () => {
  const [noOfActiveSubscriptions, setNoOfActiveSubscriptions] = useState(0);
  const [noOfActiveUsersOrEmployees, setNoOfActiveUsersOrEmployees] =
    useState(0);
  const [noOfActiveCustomers, setNoOfActiveCustomers] = useState(0);
  const [noOfInactiveSubscriptions, setNoOfInactiveSubscriptions] = useState(0);
  const [noOfInactiveUsersOrEmployees, setNoOfInactiveUsersOrEmployees] =
    useState(0);
  const [noOfInactiveCustomers, setNoOfInactiveCustomers] = useState(0);
  const [noOfActiveToday, setNoOfActiveToday] = useState(0);
  const [noOfActiveWeekly, setNoOfActiveWeekly] = useState(0);
  const [noOfActiveMonthly, setNoOfActiveMonthly] = useState(0);
  const [noOfInactiveToday, setNoOfInactiveToday] = useState(0);
  const [noOfInactiveWeekly, setNoOfInactiveWeekly] = useState(0);
  const [noOfInactiveMonthly, setNoOfInactiveMonthly] = useState(0);
  const { auth } = useAuth();

  const fetchData = async (isIfas: boolean) => {
    try {
      // Fetch users and subscriptions data based on 'isIfas' flag
      const users = isIfas ? await getAllEmployees() : await getAllApiUsers();
      const subscriptions = isIfas
        ? await getAllSubscriptions()
        : await getAllApiSubscriptions();
      const customers = isIfas ? await getAllUsers() : await getAllCustomers();

      // Initialize date ranges using moment.js
      const today = moment().startOf("day");
      const startOfWeek = moment().startOf("week");
      const startOfMonth = moment().startOf("month");
      const endOfToday = moment().endOf("day");
      const endOfWeek = moment().endOf("week");
      const endOfMonth = moment().endOf("month");

      // Filter active and inactive subscriptions based on 'isIfas' flag
      const activeSubscriptions = subscriptions.data.filter(
        (s: any) => (isIfas ? s.status : s.is_active) === 1
      );
      const inactiveSubscriptions = subscriptions.data.filter(
        (s: any) => (isIfas ? s.status : s.is_active) === 0
      );

      // Count active subscriptions for today, week, and month
      setNoOfActiveToday(
        activeSubscriptions.filter((s: any) =>
          moment(s.CREATED_ON || s.CREATED_AT).isBetween(today, endOfToday)
        ).length
      );
      setNoOfActiveWeekly(
        activeSubscriptions.filter((s: any) =>
          moment(s.CREATED_ON || s.CREATED_AT).isBetween(startOfWeek, endOfWeek)
        ).length
      );
      setNoOfActiveMonthly(
        activeSubscriptions.filter((s: any) =>
          moment(s.CREATED_ON || s.CREATED_AT).isBetween(
            startOfMonth,
            endOfMonth
          )
        ).length
      );

      // Count inactive subscriptions for today, week, and month
      setNoOfInactiveToday(
        inactiveSubscriptions.filter((s: any) =>
          moment(s.CREATED_ON || s.CREATED_AT).isBetween(today, endOfToday)
        ).length
      );
      setNoOfInactiveWeekly(
        inactiveSubscriptions.filter((s: any) =>
          moment(s.CREATED_ON || s.CREATED_AT).isBetween(startOfWeek, endOfWeek)
        ).length
      );
      setNoOfInactiveMonthly(
        inactiveSubscriptions.filter((s: any) =>
          moment(s.CREATED_ON || s.CREATED_AT).isBetween(
            startOfMonth,
            endOfMonth
          )
        ).length
      );

      // Set the total number of active and inactive subscriptions
      setNoOfActiveSubscriptions(activeSubscriptions.length);
      setNoOfInactiveSubscriptions(inactiveSubscriptions.length);

      // Filter active and inactive customers based on 'isIfas' flag
      const activeCustomers = customers.data.filter(
        (c: any) => (isIfas ? c.is_active : c.is_active) === 1
      );
      const inactiveCustomers = customers.data.filter(
        (c: any) =>
          (isIfas ? c.is_active : c.is_active) === 0 ||
          (isIfas && c.is_active === null)
      );

      // Set the total number of active and inactive customers
      setNoOfActiveCustomers(activeCustomers.length);
      setNoOfInactiveCustomers(inactiveCustomers.length);

      if (!isIfas) {
        // Set the total number of active and inactive customers
        setNoOfActiveCustomers(customers?.data.length);
        setNoOfInactiveCustomers(customers?.data.length);
      }

      // Filter active and inactive users
      const activeUsers = users.data.filter(
        (u: any) => (isIfas ? u.EMP_ACTV : u.USR_ACTV) === (isIfas ? "1" : 1)
      );
      const inactiveUsers = users.data.filter(
        (u: any) =>
          (isIfas ? u.EMP_ACTV : u.USR_ACTV) === (isIfas ? "0" : 0) ||
          (isIfas && u.EMP_ACTV === null)
      );

      // Set the total number of active and inactive users or employees
      setNoOfActiveUsersOrEmployees(activeUsers.length);
      setNoOfInactiveUsersOrEmployees(inactiveUsers.length);
    } catch (error) {
      // Log an error message if data fetching fails
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    const isIfas = auth?.loginType === "IFAS";
    fetchData(isIfas);
  }, [auth]);

  const type = auth?.loginType === "IFAS" ? "Employees" : "API Users";

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {auth?.loginType === "IFAS" ? "IFAS Dashboard" : "API Dashboard"}
      </PageTitle>
      <DashboardPage
        noOfActiveSubscriptions={noOfActiveSubscriptions}
        noOfInactiveSubscriptions={noOfInactiveSubscriptions}
        noOfActiveUsersOrEmployees={noOfActiveUsersOrEmployees}
        noOfInactiveUsersOrEmployees={noOfInactiveUsersOrEmployees}
        noOfActiveCustomers={noOfActiveCustomers}
        noOfInactiveCustomers={noOfInactiveCustomers}
        noOfActiveToday={noOfActiveToday}
        noOfActiveWeekly={noOfActiveWeekly}
        noOfActiveMonthly={noOfActiveMonthly}
        noOfInactiveToday={noOfInactiveToday}
        noOfInactiveWeekly={noOfInactiveWeekly}
        noOfInactiveMonthly={noOfInactiveMonthly}
        type={type}
      />
    </>
  );
};

export { DashboardWrapper };
