import axios from 'axios';
import { useQuery } from 'react-query';

interface EmployerData {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: string;
    search?: string;
}
const API_URL = "https://job-portal-backend-production.up.railway.app";
const GET_EMPLOYERS_LIST = `${API_URL}/api/v1/admin/employers`;

const fetchEmployers = async (params: EmployerData) => {

    const { data } = await axios.post(GET_EMPLOYERS_LIST, params);
    return data;
};

export const useGetEmployersList = (params: EmployerData) => {
    return useQuery(
        ['employers', params.page, params.limit, params.sortBy, params.sortOrder, params.search],
        () => fetchEmployers(params),
        {
            keepPreviousData: true,
            staleTime: 300000,
            refetchOnMount: true,
        }
    );
};
