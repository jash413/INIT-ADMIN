const API_URL = "https://job-portal-backend-production.up.railway.app";

const DOWNLOAD_CANDIDATE_RESUME = (id: number) =>
  `${API_URL}/api/v1/candidates/${id}/resume`;
const DOWNLOAD_CANDIDATE_PROFILE_IMAGE = (id: number) =>
  `${API_URL}/api/v1/candidates/${id}/profile-image`;

export const REQ = {
  DOWNLOAD_CANDIDATE_RESUME: (id: number) => DOWNLOAD_CANDIDATE_RESUME(id),
  DOWNLOAD_CANDIDATE_PROFILE_IMAGE: (id: number) =>
    DOWNLOAD_CANDIDATE_PROFILE_IMAGE(id),
};
