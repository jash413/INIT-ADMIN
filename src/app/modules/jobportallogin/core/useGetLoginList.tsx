import axios from "axios";
import { useQuery } from "react-query";

interface LoginData {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  user_approval_status?: number;
  profile_created?: number;
  phone_ver_status?: number;
  email_ver_status?: number;
  login_type?: string;
}
const API_URL = "https://job-portal-backend-production.up.railway.app";
const GET_USERS_LIST = `${API_URL}/api/v1/admin/get-login-data`;

const fetchAllUsersDetails = async (params: LoginData) => {
  const { data } = await axios.post(GET_USERS_LIST, params);
  return data;
};

export const useGetLoginList = (params: LoginData) => {
  return useQuery(
    [
      "users-login-details",
      params.page,
      params.limit,
      params.sortBy,
      params.sortOrder,
      params.search,
      params.user_approval_status,
      params.phone_ver_status,
      params.email_ver_status,
      params.profile_created,
    ],
    () => fetchAllUsersDetails(params),
    {
      keepPreviousData: true,
      staleTime: 300000,
      refetchOnMount: true,
    }
  );
};
