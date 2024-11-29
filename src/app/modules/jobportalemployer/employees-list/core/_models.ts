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
  employerId?: number | null;
};

export type GrantDenyAccessPayloadType = {
  employerId: number | null;
  candidateId: number | null;
};

export type EmployerListResponse = {
  login_id: number;
  cmp_code: number;
  cmp_name: string;
  cmp_email: string;
  cmp_mobn: string;
  cmp_webs: string;
  emp_loca: string;
  emp_addr: string;
  createdAt: string;
  updatedAt: string;
  Login: {
    login_name: string;
    login_email: string;
    login_mobile: string;
    user_approval_status: number;
  };
};

export interface IJobPost {
  job_id: number;
  job_title: string;
  job_description: string;
  job_cate: number;
  job_location: string;
  salary: number;
  required_skills: string;
  cmp_id: number;
  posted_at: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  employer: JobEmployer;
  job_category: JobCategory;
}

interface JobEmployer {
  cmp_name: string;
  cmp_email: string;
  cmp_mobn: string;
  emp_loca: string;
  emp_addr: string;
}

interface JobCategory {
  cate_desc: string;
}

export type UpdateJobStatusPayload = {
  job_title: string;
  job_description: string;
  job_cate: number;
  job_location: string;
  salary: number;
  required_skills: string;
  status: string;
};

type APIRes = {
  records?: EmployersAccessRequestType[];
  pagination: PaginationType;
};

export type EmployersQueryResponse = Response<APIRes>;
