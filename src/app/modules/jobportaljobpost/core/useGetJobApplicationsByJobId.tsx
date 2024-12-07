import axios from 'axios';
import { useQuery } from 'react-query';

interface CandidateParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: string;
    search?: string;
    job_id: number;
}
const API_URL = import.meta.env.VITE_APP_JOB_PORTAL_API;
const GET_EMPLOYERS_LIST = `${API_URL}/api/v1/job-applications/for-each-job-post`;

const fetchJobApplicationById = async (params: CandidateParams) => {

    const { data } = await axios.post(GET_EMPLOYERS_LIST, params);
    return data;
};

export const useGetJobApplicationsByJobId = (params: CandidateParams) => {
    return useQuery(
        ['job-applications-by-id', params.page, params.limit, params.sortBy, params.sortOrder, params.search, params.job_id],
        () => fetchJobApplicationById(params),
        {
            keepPreviousData: true,
            staleTime: 300000,
            refetchOnMount: true
        }
    );
};
