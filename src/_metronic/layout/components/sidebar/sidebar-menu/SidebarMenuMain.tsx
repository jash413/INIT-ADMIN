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
            IFAS ERP MANAGEMENT
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
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            API MANAGEMENT
          </span>
        </div>
      </div>

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
          title="Eway/Einvoice Subscriptions"
        />
        <SidebarMenuItem
          to="/api-whatsapp-subscription-management/subscriptions"
          title="Whatsapp Subscriptions"
        />
        <SidebarMenuItem
          to="/api-gstapi-subscription-management/subscriptions"
          title="GST API Subscriptions"
        />
      </SidebarMenuItemWithSub>
    </>
  );
};

export { SidebarMenuMain };
