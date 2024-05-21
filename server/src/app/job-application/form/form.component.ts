import { Component } from "@angular/core";
import { FormBuilder, FormArray, Validators, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/common/service/api.service";
import { format } from "date-fns";
@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent {
  jobApplicationForm!: FormGroup | any;
  jobId: any;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.initForm();
    this.activatedRoute.params.subscribe((param: Params) => {
      if (param["id"]) {
        this.jobId = param["id"];
        this.isEdit = true;
        this.getJobApplication(param["id"]);
      } else {
        this.isEdit = false;
      }
    });
  }

  initForm() {
    this.jobApplicationForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      address: ["", Validators.required],
      gender: ["", Validators.required],
      contact: [null, [Validators.required, Validators.pattern("^[0-9]+$")]],
      preferredLocation: ["", Validators.required],
      expectedCTC: ["", Validators.required],
      currentCTC: ["", Validators.required],
      noticePeriod: ["", Validators.required],
      educationDetails: this.fb.array([this.createEducationFormGroup()]),
      workExperience: this.fb.array([this.createWorkExperienceFormGroup()]),
      knownLanguages: this.fb.array([this.createKnownLanguageFormGroup()]),
      technicalExperience: this.fb.array([
        this.createTechnicalExperienceFormGroup(),
      ]),
    });
    this.setKnownLanguages();
  }

  createEducationFormGroup(): FormGroup {
    return this.fb.group({
      degree: ["", Validators.required],
      boardUniversity: ["", Validators.required],
      year: ["", Validators.required],
      cgpaPercentage: [
        "",
        [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)],
      ],
    });
  }

  createWorkExperienceFormGroup(): FormGroup {
    return this.fb.group({
      company: ["", Validators.required],
      designation: ["", Validators.required],
      from: ["", Validators.required],
      to: ["", Validators.required],
    });
  }

  createKnownLanguageFormGroup(language: any = {}): FormGroup {
    return this.fb.group({
      language_name: [language.language_name || "", Validators.required],
      language: [language.language || false, Validators.required],
      read: [{ value: language.read || false, disabled: true }],
      write: [{ value: language.write || false, disabled: true }],
      speak: [{ value: language.speak || false, disabled: true }],
    });
  }

  setKnownLanguages() {
    let languages = [
      {
        language_name: "English",
        language: false,
        read: false,
        write: false,
        speak: false,
      },
      {
        language_name: "Hindi",
        language: false,
        read: false,
        write: false,
        speak: false,
      },
      {
        language_name: "Gujrati",
        language: false,
        read: false,
        write: false,
        speak: false,
      },
    ];

    const languageFormGroups = languages.map((language) =>
      this.createKnownLanguageFormGroup(language)
    );
    const languageFormArray = this.fb.array(languageFormGroups);
    this.jobApplicationForm.setControl("knownLanguages", languageFormArray);
  }

  createTechnicalExperienceFormGroup(): FormGroup {
    return this.fb.group({
      technology: ["", Validators.required],
      level: [{ value: false, disabled: true }],
    });
  }

  addEducation() {
    (this.jobApplicationForm.get("educationDetails") as FormArray).push(
      this.createEducationFormGroup()
    );
  }

  addWorkExperience() {
    (this.jobApplicationForm.get("workExperience") as FormArray).push(
      this.createWorkExperienceFormGroup()
    );
  }

  addKnownLanguage() {
    (this.jobApplicationForm.get("knownLanguages") as FormArray).push(
      this.createKnownLanguageFormGroup()
    );
  }

  addTechnicalExperience() {
    (this.jobApplicationForm.get("technicalExperience") as FormArray).push(
      this.createTechnicalExperienceFormGroup()
    );
  }

  onLanguageChange(index: number) {
    const languageGroup = (
      this.jobApplicationForm.get("knownLanguages") as FormArray
    ).at(index) as FormGroup;
    if (languageGroup.get("language")?.value) {
      languageGroup.get("read")?.enable();
      languageGroup.get("write")?.enable();
      languageGroup.get("speak")?.enable();
    } else {
      languageGroup.get("read")?.setValue(false);
      languageGroup.get("write")?.setValue(false);
      languageGroup.get("speak")?.setValue(false);
      languageGroup.get("read")?.disable();
      languageGroup.get("write")?.disable();
      languageGroup.get("speak")?.disable();
    }
  }

  onTechnologyChange(index: number) {
    const techGroup = (
      this.jobApplicationForm.get("technicalExperience") as FormArray
    ).at(index) as FormGroup;
    if (techGroup.get("technology")?.value) {
      techGroup.get("level")?.enable();
    } else {
      techGroup.get("level")?.disable();
    }
  }

  getJobApplication(id: any) {
    this.apiService.getJobApplicationDetails(id).subscribe(
      (response) => {
        if (response.status == 200) {
          this.jobApplicationForm.patchValue(response.data);
        } else {
          console.error(
            "Failed to fetch job application details:",
            response.message
          );
        }
      },
      (error) => {
        console.error("Error fetching job application details:", error);
      }
    );
  }

  onSubmit() {
    if (this.jobApplicationForm.valid) {
      const requestData = {
        url: "job-application/create",
        data: this.jobApplicationForm.value,
      };
      this.apiService.post(requestData).subscribe(
        (response) => {
          this.showSuccessToastr();
          this.router.navigate(["/job-application/list"]);
        },
        (error) => {
          console.error("Error creating job application:", error);
        }
      );
    } else {
      console.log("Form is invalid");
      this.jobApplicationForm.markAllAsTouched();
    }
  }

  onUpdate() {
    if (this.jobApplicationForm.valid && this.jobId) {
      console.log(
        "Updating job application with ID",
        this.jobId,
        ":",
        this.jobApplicationForm.value
      );
      const requestData = {
        url: `job-application/update/${this.jobId}`,
        data: this.jobApplicationForm.value,
      };
      this.apiService.put(requestData).subscribe(
        (response) => {
          this.updateSuccessToastr();
          this.router.navigate(["/job-application/list"]);
          console.log("Job application updated:", response);
        },
        (error) => {
          console.error("Error updating job application:", error);
        }
      );
    } else {
      console.log("Form is invalid or jobId is not set");
      this.jobApplicationForm.markAllAsTouched();
    }
  }

  showSuccessToastr() {
    this.toastr.success("Job Application Create Successfully", "Success");
  }

  updateSuccessToastr() {
    this.toastr.success("Job Application updated Successfully", "Success");
  }

  // formatDate(dateString: string): string {
  //   try {
  //     if (!dateString) return ""; // Handle empty date string
  //     const formattedDate = format(new Date(dateString), "dd/MM/yyyy");
  //     return formattedDate;
  //   } catch (error) {
  //     console.error("Error formatting date:", error);
  //     return ""; // Return empty string if formatting fails
  //   }
  // }
}
