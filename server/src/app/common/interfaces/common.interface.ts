export interface IRequest {
  url: string;
  data?: any;
}

export interface JobApplications {
  id: number;
  name: string;
  email: string;
  address: string;
  preferredLocation: string;
  gender: string;
  contact: number;
  expectedCTC: string;
  currentCTC: string;
  noticePeriod: string;
}
