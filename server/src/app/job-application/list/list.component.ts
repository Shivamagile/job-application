import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/common/service/api.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { JobApplications } from "src/app/common/interfaces/common.interface";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  dataList: JobApplications[] = [];
  searchTerm: string = "";

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getJobApplications();
  }

  getJobApplications() {
    this.apiService.getJobApplications().subscribe(
      (response) => {
        if (response.status == 200) {
          this.dataList = response.data.jobList;
        } else {
          this.dataList = [];
          console.error("Failed to fetch job applications:", response.message);
        }
      },
      (error) => {
        this.dataList = [];
        console.error("Error fetching job applications:", error);
      }
    );
  }

  deleteItem(itemId: number): void {
    if (confirm("Are you sure you want to delete this item?")) {
      this.apiService.deleteJobApplication(itemId).subscribe(
        (response) => {
          if (response.status == 200) {
            this.getJobApplications();
            this.toastr.success(response?.message, "Success");
          } else {
            this.toastr.success(response?.message, "Error");
          }
        },
        (error) => {
          this.toastr.success("Something went wrong!", "Error");
          console.error("Error deleting item:", error);
        }
      );
    }
  }

  searchJobApplications(searchbody: any) {
    this.apiService.searchJobApplications(searchbody).subscribe(
      (response) => {
        if (response.status == 200) {
          this.dataList = response.data.jobList;
        } else {
          this.dataList = [];
          console.error("Failed to fetch job applications:", response.message);
        }
      },
      (error) => {
        this.dataList = [];
        console.error("Error fetching job applications:", error);
      }
    );
  }

  onSearch(): void {
    const body = {
      search: this.searchTerm,
    };

    this.searchJobApplications(body);
  }
}
