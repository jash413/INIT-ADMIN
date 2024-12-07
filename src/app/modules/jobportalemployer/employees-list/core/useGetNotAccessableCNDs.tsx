import axios from 'axios';
import { useQuery } from 'react-query';

interface CandidateWithoutAccess {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: string;
    employerId?: number;
}
const API_URL = import.meta.env.VITE_APP_JOB_PORTAL_API;
const GET_NOT_ACCESABLE_CNDS_LIST = `${API_URL}/api/v1/admin/get-not-accessible-candidates`;

const fetchNotAccessableCNDs = async (params: CandidateWithoutAccess) => {

    const { data } = await axios.post(GET_NOT_ACCESABLE_CNDS_LIST, params);
    return data;
};

export const useGetNotAccessableCNDs = (params: CandidateWithoutAccess) => {
    return useQuery(
        ['candidate-without-access', params.page, params.limit, params.employerId, params.sortBy, params.sortOrder],
        () => fetchNotAccessableCNDs(params),
        {
            keepPreviousData: true,
            staleTime: 300000,
            refetchOnMount: true,
        }
    );
};
