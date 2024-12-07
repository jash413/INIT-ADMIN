import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { MenuTestPage } from "../pages/MenuTestPage";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import { useAuth } from "../modules/auth";

const PrivateRoutes = () => {
  const { auth } = useAuth();
  const loginType = auth?.loginType;

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
  const JobPostPage = lazy(
    () => import("../modules/jobportaljobpost/JobPostPage")
  );
  const EmployerPage = lazy(
    () => import("../modules/jobportalemployer/EmployerListPage")
  );
  const CandidatePage = lazy(
    () => import("../modules/jobportalcandidate/CandidateListPage")
  );
  const EmployerProfilePage = lazy(
    () => import("../modules/jobportalemployer/EmployerProfilePage")
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
  const ApiCustomerProfilePage = lazy(
    () => import("../modules/apicustomerprofile/ProfilePage")
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registration */}
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

        {/* IFAS Specific Routes */}
        {loginType === "IFAS" && (
          <>
            <Route
              path="customer-management/*"
              element={
                <SuspensedView>
                  <CustomerPage />
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
          </>
        )}

        {/* API Specific Routes */}
        {loginType === "API" && (
          <>
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
              path="api-customer-profile/*"
              element={
                <SuspensedView>
                  <ApiCustomerProfilePage />
                </SuspensedView>
              }
            />
          </>
        )}

        {/* JOBPORTAL Specific Routes */}
        {loginType === "JOBPORTAL" && (
          <>
            <Route
              path="/jobportal-employer-management/*"
              element={
                <SuspensedView>
                  <EmployerPage />
                </SuspensedView>
              }
            />
            <Route
              path="jobportal-employer-profile/*"
              element={
                <SuspensedView>
                  <EmployerProfilePage />
                </SuspensedView>
              }
            />
            <Route
              path="/jobportal-job-post-management/*"
              element={
                <SuspensedView>
                  <JobPostPage />
                </SuspensedView>
              }
            />
            <Route
              path="/jobportal-candidate-management/*"
              element={
                <SuspensedView>
                  <CandidatePage />
                </SuspensedView>
              }
            />
          </>
        )}

        {/* Apps */}
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
        <Route path="*" element={<Navigate to="/dashboard" />} />
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
