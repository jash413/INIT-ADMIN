import React from "react";
import { Navigate, Routes, Route, Outlet, useParams } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { ProfileHeader } from "./component/ProfileHeader";
import JobPostPage from "./component/JobPostPage";
import AccessRequestPage from "./component/AccessRequestPage";


const generateBreadcrumbs = (page: string, id: string): Array<PageLink> => {
    return [
        {
            title: "Profile",
            path: `jobportal-employer-profile/${id}/access-request`,
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
        return <Navigate to="jobportal-employer-management/employers" replace />;
    }
    return <PageWithId Component={Component} pageTitle={pageTitle} id={id} />;
};

const EmployerProfilePage: React.FC = () => {
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
                    path="access-request"
                    element={
                        <RouteWithParams Component={AccessRequestPage} pageTitle="Access Request" />
                    }
                />
                <Route
                    path="job-post"
                    element={
                        <RouteWithParams Component={JobPostPage} pageTitle="Job Post" />
                    }
                />
                <Route index element={<Navigate to="/employers" />} />
            </Route>
        </Routes>
    );
};

export default EmployerProfilePage;
