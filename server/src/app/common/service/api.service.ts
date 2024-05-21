import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/app/environment/environment";
import { IRequest } from "../interfaces/common.interface";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(request: IRequest, auth: boolean = false) {
    return this.http.get(environment.API_URL + request.url, request.data);
  }

  post(request: IRequest, auth: boolean = false) {
    return this.http.post(environment.API_URL + request.url, request.data);
  }

  put(request: IRequest, auth: boolean = false) {
    return this.http.put(environment.API_URL + request.url, request.data);
  }

  delete(request: IRequest, auth: boolean = false) {
    return this.http.delete(environment.API_URL + request.url);
  }

  login(email: string, password: string): Observable<any> {
    const req = {
      url: "/auth/admin/login",
      data: { email, password },
    };
    return this.post(req);
  }

  getJobApplications(): Observable<any> {
    const req: IRequest = {
      url: "job-application/search",
      data: {},
    };
    return this.post(req, true);
  }

  searchJobApplications(searchbody: any): Observable<any> {
    const req: IRequest = {
      url: "job-application/search",
      data: searchbody,
    };
    return this.post(req, true);
  }

  getJobApplicationDetails(id: number): Observable<any> {
    const req: IRequest = {
      url: `job-application/details/${id}`,
      data: {},
    };
    return this.get(req, true);
  }

  deleteJobApplication(id: number): Observable<any> {
    const req: IRequest = {
      url: `job-application/delete/${id}`,
      data: {},
    };
    return this.delete(req, true);
  }

  getJobApplicationCount(count: number): Observable<any> {
    const req: IRequest = {
      url: `job-application/count`,
      data: {},
    };
    return this.get(req);
  }
}
