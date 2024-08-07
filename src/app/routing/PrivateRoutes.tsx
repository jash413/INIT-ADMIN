import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { MenuTestPage } from "../pages/MenuTestPage";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";

const PrivateRoutes = () => {
  const WizardsPage = lazy(() => import("../modules/wizards/WizardsPage"));
  const CustomerPage = lazy(() => import("../modules/customers/UsersPage"));
  const WidgetsPage = lazy(() => import("../modules/widgets/WidgetsPage"));
  const ChatPage = lazy(() => import("../modules/apps/chat/ChatPage"));
  const UsersPage = lazy(
    () => import("../modules/apps/user-management/UsersPage")
  );
  const SubscriptionPage = lazy(
    () => import("../modules/subscriptions/SubscriptionsPage")
  );
  const EmployeeallotmentPage = lazy(
    () => import("../modules/employeeallotment/EmployeesPage")
  );
  const CustomerProfilePage = lazy(
    () => import("../modules/customerprofile/ProfilePage")
  );
  const SubscriptionProfilePage = lazy(
    () => import("../modules/subscriptionprofile/ProfilePage")
  );
  const ApiCustomersPage = lazy(
    () => import("../modules/apicustomers/CustomersPage")
  );
  const ApiUsersPage = lazy(() => import("../modules/apiusers/UsersPage"));
  const ApiEwayEinvoiceSubscriptionsPage = lazy(
    () => import("../modules/apisubscriptions/ewayeinvoice/SubscriptionsPage")
  );
  const ApiGstApiSubscriptionsPage = lazy(
    () => import("../modules/apisubscriptions/gstapi/SubscriptionsPage")
  );
  const ApiWhatsappSubscriptionsPage = lazy(
    () => import("../modules/apisubscriptions/whatsapp/SubscriptionsPage")
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        <Route path="menu-test" element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path="crafted/pages/wizards/*"
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/widgets/*"
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path="customer-management/*"
          element={
            <SuspensedView>
              <CustomerPage />
            </SuspensedView>
          }
        />
        <Route
          path="api-customer-management/*"
          element={
            <SuspensedView>
              <ApiCustomersPage />
            </SuspensedView>
          }
        />
        <Route
          path="api-user-management/*"
          element={
            <SuspensedView>
              <ApiUsersPage />
            </SuspensedView>
          }
        />
        <Route
          path="api-ewayeinvoice-subscription-management/*"
          element={
            <SuspensedView>
              <ApiEwayEinvoiceSubscriptionsPage />
            </SuspensedView>
          }
        />
        <Route
          path="api-gstapi-subscription-management/*"
          element={
            <SuspensedView>
              <ApiGstApiSubscriptionsPage />
            </SuspensedView>
          }
        />
        <Route
          path="api-whatsapp-subscription-management/*"
          element={
            <SuspensedView>
              <ApiWhatsappSubscriptionsPage />
            </SuspensedView>
          }
        />
        <Route
          path="subscription-management/*"
          element={
            <SuspensedView>
              <SubscriptionPage />
            </SuspensedView>
          }
        />
        <Route
          path="employee-allotment/*"
          element={
            <SuspensedView>
              <EmployeeallotmentPage />
            </SuspensedView>
          }
        />
        <Route
          path="customer-profile/*"
          element={
            <SuspensedView>
              <CustomerProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path="subscription-profile/*"
          element={
            <SuspensedView>
              <SubscriptionProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/chat/*"
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/user-management/*"
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
