import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { useAuth } from "../../../../../app/modules/auth/core/Auth";

const SidebarMenuMain = () => {
  const { auth } = useAuth();
  return (
    <>
      {auth?.loginType === "IFAS" && (
        <>
          <div className="menu-item">
            <div className="menu-content pt-8 pb-2">
              <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                IFAS ERP MANAGEMENT
              </span>
            </div>
          </div>
          <SidebarMenuItem
            to="/dashboard"
            icon="element-11"
            title="Dashboard"
            fontIcon="bi-app-indicator"
          />
          <SidebarMenuItem
            to="/customer-management/customers"
            title="Customers"
            icon="profile-circle"
            fontIcon="bi-person"
          />
          <SidebarMenuItem
            to="/subscription-management/subscriptions"
            title="Subscriptions"
            icon="plus-circle"
            fontIcon="bi-person"
          />
          <SidebarMenuItem
            to="/employee-allotment/employees"
            title="Employee Allotment"
            fontIcon="bi-sticky"
            icon="user-tick"
          />
        </>
      )}

      {auth?.loginType === "API" && (
        <>
          <div className="menu-item">
            <div className="menu-content pt-8 pb-2">
              <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                API MANAGEMENT
              </span>
            </div>
          </div>
          <SidebarMenuItem
            to="/dashboard"
            icon="element-11"
            title="Dashboard"
            fontIcon="bi-app-indicator"
          />
          <SidebarMenuItem
            to="/api-customer-management/customers"
            title="Customers"
            icon="profile-circle"
            fontIcon="bi-person"
          />
          <SidebarMenuItem
            to="/api-user-management/users"
            title="Users"
            fontIcon="bi-sticky"
            icon="user-tick"
          />
          <SidebarMenuItemWithSub
            title="Subscriptions"
            icon="plus-circle"
            fontIcon="bi-person"
            to="/subscription-management"
          >
            <SidebarMenuItem
              to="/api-ewayeinvoice-subscription-management/subscriptions"
              title="EWAY/EINVOICE"
            />
            <SidebarMenuItem
              to="/api-whatsapp-subscription-management/subscriptions"
              title="WHATSAPP"
            />
            <SidebarMenuItem
              to="/api-gstapi-subscription-management/subscriptions"
              title="GST API"
            />
          </SidebarMenuItemWithSub>
        </>
      )}

      {auth?.loginType === "JOBPORTAL" && (
        <>
          <div className="menu-item">
            <div className="menu-content pt-8 pb-2">
              <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                JOB PORTAL MANAGEMENT
              </span>
            </div>
          </div>
          {/* <SidebarMenuItem
            to="/dashboard"
            icon="element-11"
            title="Dashboard"
            fontIcon="bi-app-indicator"
          /> */}
          <SidebarMenuItem
            to="/jobportal-job-post-management/job-posts"
            title="Job Posts"
            icon="profile-circle"
            fontIcon="bi-person"
          />
          <SidebarMenuItem
            to="/jobportal-candidate-management/candidates"
            title="Candidates"
            fontIcon="bi-sticky"
            icon="user-tick"
          />
          <SidebarMenuItem
            to="/jobportal-employer-management/employers"
            title="Employers"
            fontIcon="bi-sticky"
            icon="user-tick"
          />
        </>
      )}
    </>
  );
};

export { SidebarMenuMain };
