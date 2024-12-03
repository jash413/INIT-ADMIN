import axios from 'axios';
import { useMutation } from 'react-query';

interface MutationPayload {
    employerId: number;
    candidateId: number;
}

const API_URL = "https://job-portal-backend-production.up.railway.app";
const GRANT_CND_ACCESS = `${API_URL}/api/v1/admin/grant-profile-access`;

const grantCNDAccessById = async (payload: MutationPayload) => {
    const { data } = await axios.post(GRANT_CND_ACCESS, payload);
    return data;
};

export const useGrantCNDAccessById = () => {
    return useMutation((payload: MutationPayload) => grantCNDAccessById(payload), {
        onSuccess: () => {
        },
        onError: (error) => {
            console.error('Update failed:', error);
        },
    });
};
