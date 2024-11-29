import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import CandidateListContent from './CandidateListContent'

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
            </Route>
            <Route index element={<Navigate to='/jobportal-candidate-management/candidates' />} />
        </Routes>
    )
}

export default CandidateListPage
