import axios from 'axios';
import { useQuery } from 'react-query';

interface EmployerParams {
    id: string;
}
const API_URL = import.meta.env.VITE_APP_JOB_PORTAL_API;
const GET_EMPLOYERS_LIST = (id: string) => `${API_URL}/api/v1/admin/employers/${id}`;

const fetchEmployer = async (params: EmployerParams) => {

    const { data } = await axios.get(GET_EMPLOYERS_LIST(params?.id));
    return data;
};

export const useGetEmployer = (params: EmployerParams) => {
    return useQuery(
        ['employer', params.id],
        () => fetchEmployer(params),
        {
            keepPreviousData: true,
            staleTime: 300000,
        }
    );
};
