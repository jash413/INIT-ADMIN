/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://job-portal-backend-production.up.railway.app";
const DELETE_USER_FROM_ID = (id: number) =>
  `${API_URL}/api/v1/admin/login-data/${id}`;
const UPDATE_USER_APPROVAL_STATUS = (id: number) =>
  `${API_URL}/api/v1/admin/users/${id}/approval-status`;

const deleteUserById = (id: number): Promise<void> => {
  return axios
    .delete(`${DELETE_USER_FROM_ID(id)}`)
    .then((d) => {
      d.data;
    })
    .catch((error) => {
      toast.error(
        `Failed to deny request: ${
          error?.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const updateUserApprovalStatus = (
  loginId: number,
  status: number
): Promise<void> => {
  return axios
    .put(UPDATE_USER_APPROVAL_STATUS(loginId), {
      user_approval_status: status,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toast.error(
        `Failed to update user approval status: ${
          error?.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

export { deleteUserById, updateUserApprovalStatus };
