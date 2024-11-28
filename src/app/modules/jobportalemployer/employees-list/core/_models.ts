import { Response } from "../../../../../_metronic/helpers";
type Employer = {
  cmp_name: string;
};

type Candidate = {
  can_name: string;
};

export type EmployersAccessRequestType = {
  id: number;
  employerId: number;
  candidateId: number;
  status: string; // Consider making this a union type if there are predefined statuses, e.g., 'pending' | 'approved' | 'rejected'
  requestedAt: string;
  reviewedAt: string;
  createdAt: string;
  updatedAt: string;
  Employer: Employer;
  Candidate: Candidate;
};

export type PaginationType = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  nextPage?: number | null;
  prevPage?: number | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type FilterType = {
  page: number | null;
  limit: number | null;
  search?: string | null;
};

export type GrantDenyAccessPayloadType = {
  employerId: number | null;
  candidateId: number | null;
};

type APIRes = {
  records?: EmployersAccessRequestType[];
  pagination: PaginationType;
};

export type EmployersQueryResponse = Response<APIRes>;
