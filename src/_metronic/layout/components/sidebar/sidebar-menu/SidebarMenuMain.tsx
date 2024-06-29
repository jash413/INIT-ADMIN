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
        to="/user-allotment/users"
        title="User Allotment"
        fontIcon="bi-sticky"
        icon="user-tick"
      />
      <SidebarMenuItemWithSub
        to="/crafted/widgets"
        title="Widgets"
        icon="element-7"
        fontIcon="bi-layers"
      >
        <SidebarMenuItem
          to="/crafted/widgets/lists"
          title="Lists"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/statistics"
          title="Statistics"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/charts"
          title="Charts"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/mixed"
          title="Mixed"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/tables"
          title="Tables"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/feeds"
          title="Feeds"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
    </>
  );
};

export { SidebarMenuMain };
