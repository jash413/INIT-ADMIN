import { Route, Routes, Outlet, Navigate, useParams } from 'react-router-dom'
import JobPostList from '../jobportalemployer/employees-list/compoents/JobPostList'
import { ProfileHeader } from '../jobportalemployer/component/ProfileHeader'
import { PageTitle } from '../../../_metronic/layout/core';

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
            <PageTitle>
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


const JobPostPage = () => {


    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    path='job-posts'
                    element={
                        <>
                            <JobPostList showCompanyDetails />
                        </>
                    }
                />
                <Route
                    path='job-posts/:id/employer-job-posts'
                    element={
                        <>
                            <RouteWithParams Component={ProfileHeader} pageTitle="Profile" />
                            <Outlet />
                        </>
                    }
                />
            </Route>
            <Route index element={<Navigate to='/jobportal-job-post-management/job-posts' />} />
        </Routes>
    )
}

export default JobPostPage
