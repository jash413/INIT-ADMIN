import { Route, Routes, Outlet, Navigate, useParams } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import CandidateListContent from './CandidateListContent'
import { ProfileHeader } from './ProfileHeader';

const EmployerBreadcrumbs: Array<PageLink> = [
    {
        title: 'Employers Management',
        path: '/jobportal-employer-management/employers',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]
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
        return <Navigate to="/jobportal-employer-management/employers" replace />;
    }
    return (
        <>
            <PageTitle breadcrumbs={EmployerBreadcrumbs}>{pageTitle}</PageTitle>
            <Component id={id} />
        </>
    );
};

const CandidateListPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    path='candidates'
                    element={
                        <>
                            <PageTitle breadcrumbs={EmployerBreadcrumbs}>Candidates list</PageTitle>
                            <CandidateListContent />
                        </>
                    }
                />
                <Route
                    path=":id/candidate"
                    element={
                        <RouteWithParams
                            Component={ProfileHeader}
                            pageTitle="Employer Details"
                        />
                    }
                />
            </Route>
            <Route index element={<Navigate to='/jobportal-candidate-management/candidates' />} />
        </Routes>
    )
}

export default CandidateListPage
