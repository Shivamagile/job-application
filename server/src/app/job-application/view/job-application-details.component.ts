import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/common/service/api.service';


@Component({
  selector: 'app-job-application-details',
  templateUrl: './job-application-details.component.html',
  styleUrls: ['./job-application-details.component.css']
})
export class JobApplicationDetailsComponent implements OnInit {
  jobApplication: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    const jobId = this.route.snapshot.params['id'];
    this.apiService.getJobApplicationDetails(jobId).subscribe(
      (response) => {
        if (response.status === 200) {
          this.jobApplication = response.data;
        } else {
          console.error('Failed to fetch job application details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching job application details:', error);
      }
    );
  }
}
