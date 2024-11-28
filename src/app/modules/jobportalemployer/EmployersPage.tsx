import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import EmployersList from './employees-list/compoents/EmployersList'

const EmployersPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    path='employers'
                    element={
                        <>
                            <EmployersList />
                        </>
                    }
                />
            </Route>
            <Route index element={<Navigate to='/jobportal-employer-management/employers' />} />
        </Routes>
    )
}

export default EmployersPage
