/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FilterType,
  GrantDenyAccessPayloadType,
  UpdateJobStatusPayload,
} from "./_models";

const API_URL = import.meta.env.VITE_APP_JOB_PORTAL_API;
const GET_EMPLOYERS_ACCESS_REQ_URL = `${API_URL}/api/v1/admin/access-requests`;
const GET_EMPLOYERS_JOB_POST_URL = `${API_URL}/api/v1/admin/job-posts`;
const GET_EMPLOYERS_JOB_POST_WITHOUT_ACCESS_URL = `${API_URL}/api/v1/admin/get-job-posts-with-no-access-granted-to-candidates`;
const UPDATE_ACCESS_REQ_URL = `${API_URL}/api/v1/admin/access-requests`;
const GRANT_PROFILE_ACCESS_REQ_URL = `${API_URL}/api/v1/admin/grant-profile-access`;
const REVOKE_PROFILE_ACCESS_REQ_URL = `${API_URL}/api/v1/admin/revoke-profile-access`;
const UPDATE_JOB_POST_STATUS = (id: number) =>
  `${API_URL}/api/v1/job-posts/${id}`;
const UPDATE_USER_APPROVAL_STATUS = (id: number) =>
  `${API_URL}/api/v1/admin/users/${id}/approval-status`;
const UPDATE_OPEN_TO_STATUS = (id: number) =>
  `${API_URL}/api/v1/admin/candidates/${id}/open-to-job`;

const getEmployersAccessReq = (filters: FilterType): Promise<any> => {
  return axios
    .post(`${GET_EMPLOYERS_ACCESS_REQ_URL}`, filters)
    .then((d: AxiosResponse<any>) => d.data)
    .catch((error) => {
      toast.error(
        `Failed to get employers: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const getEmployersJobPost = (filters: FilterType): Promise<any> => {
  return axios
    .post(`${GET_EMPLOYERS_JOB_POST_URL}`, filters)
    .then((d: AxiosResponse<any>) => d.data)
    .catch((error) => {
      toast.error(
        `Failed to get employers: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};
const getEmployersJobPostWithoutAccess = (
  filters: FilterType
): Promise<any> => {
  return axios
    .post(`${GET_EMPLOYERS_JOB_POST_WITHOUT_ACCESS_URL}`, filters)
    .then((d: AxiosResponse<any>) => d.data)
    .catch((error) => {
      toast.error(
        `Failed to get employers: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const approveAccessRequest = (id: number): Promise<void> => {
  return axios
    .put(`${UPDATE_ACCESS_REQ_URL}/${id}/approve`)
    .then((d) => {
      d.data;
    })
    .catch((error) => {
      toast.error(
        `Failed to approve request: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const denyAccessRequest = (id: number): Promise<void> => {
  return axios
    .put(`${UPDATE_ACCESS_REQ_URL}/${id}/deny`)
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

const grantProfileAccess = (
  payload: GrantDenyAccessPayloadType
): Promise<void> => {
  return axios
    .post(`${GRANT_PROFILE_ACCESS_REQ_URL}`, payload)
    .then((d) => {
      d.data;
    })
    .catch((error) => {
      toast.error(
        `Failed to grant request: ${
          error?.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const revokeProfileAccess = (
  payload: GrantDenyAccessPayloadType
): Promise<void> => {
  return axios
    .post(`${REVOKE_PROFILE_ACCESS_REQ_URL}`, payload)
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

const updateOpenToJobStatus = (
  canId: number,
  status: number
): Promise<void> => {
  return axios
    .put(UPDATE_OPEN_TO_STATUS(canId), {
      open_to_job: status,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toast.error(
        `Failed to update user open to job status: ${
          error?.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const updateJobPostStatus = (
  id: number,
  payload: UpdateJobStatusPayload
): Promise<void> => {
  return axios
    .put(`${UPDATE_JOB_POST_STATUS(id)}`, payload)
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

export {
  getEmployersAccessReq,
  getEmployersJobPost,
  getEmployersJobPostWithoutAccess,
  approveAccessRequest,
  updateOpenToJobStatus,
  denyAccessRequest,
  grantProfileAccess,
  revokeProfileAccess,
  updateUserApprovalStatus,
  updateJobPostStatus,
};
