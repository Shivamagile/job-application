import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/common/service/api.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private auth: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const request = {
        url: "admin/auth/login",
        data: this.loginForm.value,
      };
      this.auth.post(request).subscribe(
        (res: any) => {
          this.showSuccessToastr();
          this.loginForm.reset();
          localStorage.setItem("auth_token", res["data"]["access_token"]);
          this.router.navigate(["/job-application/list"]);
        },
        (err: HttpErrorResponse) => {
          if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage =
              "An unexpected error occurred. Please try again later.";
          }
          this.showErrorToastr(err.error);
        }
      );
    } else {
      console.log("{{}{}{}");
      this.errorMessage = "Please enter valid email and password";
      this.showErrorToastr({ message: this.errorMessage });
    }
  }

  get email(): any {
    return this.loginForm.get("email") as FormControl;
  }

  get password(): any {
    return this.loginForm.get("password") as FormControl;
  }

  showSuccessToastr() {
    this.toastr.success("Login Successfully", "Success");
  }

  showErrorToastr(error: any) {
    const errorMessage = error.message || "An error occurred";
    this.toastr.error(errorMessage || "An error occurred", "Error");
  }
}
