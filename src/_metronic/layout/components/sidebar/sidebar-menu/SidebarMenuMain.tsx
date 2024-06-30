import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="element-11"
        title="Dashboard"
        fontIcon="bi-app-indicator"
      />
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Customer Management
          </span>
        </div>
      </div>

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
  );
};

export { SidebarMenuMain };
