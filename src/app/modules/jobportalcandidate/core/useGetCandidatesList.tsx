import axios from 'axios';
import { useQuery } from 'react-query';

interface CandidateParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: string;
    search?: string;
}
const API_URL = "https://job-portal-backend-production.up.railway.app";
const GET_EMPLOYERS_LIST = `${API_URL}/api/v1/admin/candidates`;

const fetchCandidates = async (params: CandidateParams) => {

    const { data } = await axios.post(GET_EMPLOYERS_LIST, params);
    return data;
};

export const useGetCandidatesList = (params: CandidateParams) => {
    return useQuery(
        ['candidates', params.page, params.limit, params.sortBy, params.sortOrder, params.search],
        () => fetchCandidates(params),
        {
            keepPreviousData: true,
            staleTime: 300000,
            refetchOnMount: true
        }
    );
};
