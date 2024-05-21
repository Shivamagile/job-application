import { Component, OnInit } from "@angular/core";
import { count } from "rxjs";
import { ApiService } from "src/app/common/service/api.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  jobApplicationCount: number = 0;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getJobApplicationCount(count);
  }
  getJobApplicationCount(count: any) {
    this.apiService.getJobApplicationCount(count).subscribe(
      (response) => {
        this.jobApplicationCount = response.data.count;
      },
      (error) => {
        console.error("Error fetching job application count", error);
      }
    );
  }
}
