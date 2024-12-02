import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import EmployesListContent from './EmployesListContent'

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



const EmployerListPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    path='employers'
                    element={
                        <>
                            <PageTitle breadcrumbs={EmployerBreadcrumbs}>Employers list</PageTitle>
                            <EmployesListContent />
                        </>
                    }
                />
            </Route>
            <Route index element={<Navigate to='/jobportal-employer-management/employers' />} />
        </Routes>
    )
}

export default EmployerListPage
