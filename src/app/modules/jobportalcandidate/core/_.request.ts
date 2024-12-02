const API_URL = "https://job-portal-backend-production.up.railway.app";

const UPDATE_JOB_POST_STATUS = (id: number) =>
  `${API_URL}/api/v1/candidates/${id}/resume`;

export const REQ = {
  UPDATE_JOB_POST_STATUS: (id: number) => UPDATE_JOB_POST_STATUS(id),
};
