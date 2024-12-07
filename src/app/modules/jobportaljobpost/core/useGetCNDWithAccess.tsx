import axios from 'axios';
import { useQuery } from 'react-query';

interface CandidateParams {
    page: number;
    limit: number;
    employerId?: number;
}
const API_URL = import.meta.env.VITE_APP_JOB_PORTAL_API;
const GET_EMPLOYERS_LIST = `${API_URL}/api/v1/admin/candidates-with-profile-access`;

const fetchCandidatesWithAccess = async (params: CandidateParams) => {

    const { data } = await axios.post(GET_EMPLOYERS_LIST, params);
    return data;
};

export const useGetCNDWithAccess = (params: CandidateParams) => {
    return useQuery(
        ['candidates-profile-access', params.page, params.limit, params.employerId],
        () => fetchCandidatesWithAccess(params),
        {
            cacheTime: 0,
            staleTime: 0,
            refetchOnMount: true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
        }
    );
};
