import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import JobPostList from '../jobportalemployer/employees-list/compoents/JobPostList'

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
            </Route>
            <Route index element={<Navigate to='/jobportal-job-post-management/job-posts' />} />
        </Routes>
    )
}

export default JobPostPage
