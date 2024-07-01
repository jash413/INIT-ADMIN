import React from "react";
import { Navigate, Routes, Route, Outlet, useParams } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { Subscriptions } from "./components/Subscriptions";
import { Employees } from "./components/Employees";
import { ProfileHeader } from "./ProfileHeader";

const generateBreadcrumbs = (page: string, id: string): Array<PageLink> => {
  return [
    {
      title: "Profile",
      path: `/customer-profile/${id}/subscriptions`,
      isSeparator: false,
      isActive: false,
    },
    {
      title: "",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];
};

interface PageWithIdProps {
  Component: React.ComponentType<{ id: string }>;
  pageTitle: string;
  id: string;
}

const PageWithId: React.FC<PageWithIdProps> = ({
  Component,
  pageTitle,
  id,
}) => {
  return (
    <>
      <PageTitle breadcrumbs={generateBreadcrumbs(pageTitle, id)}>
        {pageTitle}
      </PageTitle>
      <Component id={id} />
    </>
  );
};

interface RouteWithParamsProps {
  Component: React.ComponentType<{ id: string }>;
  pageTitle: string;
}

const RouteWithParams: React.FC<RouteWithParamsProps> = ({
  Component,
  pageTitle,
}) => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <Navigate to="/customer-profile/subscriptions" replace />;
  }
  return <PageWithId Component={Component} pageTitle={pageTitle} id={id} />;
};

const CustomerProfilePage: React.FC = () => {
  return (
    <Routes>
      <Route
        path=":id/*"
        element={
          <>
            <RouteWithParams Component={ProfileHeader} pageTitle="Profile" />
            <Outlet />
          </>
        }
      >
        <Route
          path="subscriptions"
          element={
            <RouteWithParams Component={Subscriptions} pageTitle="Subscriptions" />
          }
        />
        <Route
          path="employees"
          element={
            <RouteWithParams Component={Employees} pageTitle="Employees" />
          }
        />
        <Route index element={<Navigate to="subscriptions" />} />
      </Route>
    </Routes>
  );
};

export default CustomerProfilePage;
