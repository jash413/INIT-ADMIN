import axios from 'axios';
import { useMutation } from 'react-query';

interface MutationPayload {
    employerId: string;
    candidateIds: number[];
    jobPostId: string;
}

const API_URL = "https://job-portal-backend-production.up.railway.app";
const POST_ACCESS_UPDATE = `${API_URL}/api/v1/admin/update-job-post-access`;

const updateCandidatesAccess = async (payload: MutationPayload) => {
    const { data } = await axios.post(POST_ACCESS_UPDATE, payload);
    return data;
};

export const useUpdateCandidatesAccess = () => {
    return useMutation((payload: MutationPayload) => updateCandidatesAccess(payload), {
        onSuccess: () => {
        },
        onError: (error) => {
            console.error('Update failed:', error);
        },
    });
};
