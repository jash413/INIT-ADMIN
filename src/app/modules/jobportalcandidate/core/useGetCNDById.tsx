import axios from 'axios';
import { useQuery } from 'react-query';

interface CandidateParams {
    page: number;
    limit: number;
    can_code: number;
}
const API_URL = "https://job-portal-backend-production.up.railway.app";
const GET_EMPLOYERS_LIST = `${API_URL}/api/v1/admin/candidates`;

const fetchCandidatesById = async (params: CandidateParams) => {

    const { data } = await axios.post(GET_EMPLOYERS_LIST, params);
    return data;
};

export const useGetCNDById = (params: CandidateParams) => {
    return useQuery(
        ['candidate-details', params.page, params.limit, params.can_code],
        () => fetchCandidatesById(params),
        {
            keepPreviousData: true,
            staleTime: 300000,
            refetchOnMount: true
        }
    );
};
