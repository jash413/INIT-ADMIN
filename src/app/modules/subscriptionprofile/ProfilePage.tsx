import React from "react";
import { Navigate, Routes, Route, Outlet, useParams } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { Employees } from "./components/Employees";
import { ProfileHeader } from "./ProfileHeader";

const generateBreadcrumbs = (page: string, id: string): Array<PageLink> => {
  return [
    {
      title: "Profile",
      path: `/subscription-profile/${id}/employees`,
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
    return <Navigate to="/subscription-profile/employees" replace />;
  }
  return <PageWithId Component={Component} pageTitle={pageTitle} id={id} />;
};

const SubscriptionProfilePage: React.FC = () => {
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
          path="employees"
          element={
            <RouteWithParams Component={Employees} pageTitle="Employees" />
          }
        />
        <Route index element={<Navigate to="employees" />} />
      </Route>
    </Routes>
  );
};

export default SubscriptionProfilePage;
