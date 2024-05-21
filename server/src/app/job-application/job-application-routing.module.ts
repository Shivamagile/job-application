import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from "./form/form.component";
import { ListComponent } from "./list/list.component";
import { AuthGuard } from "../common/guard/auth.guard";
import { JobApplicationDetailsComponent } from "./view/job-application-details.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/job-application/list",
  },
  {
    path: "job-application/create",
    component: FormComponent,
  },
  {
    path: "job-application/edit/:id",
    component: FormComponent,
  },
  {
    path: "job-application/view/:id",
    component: JobApplicationDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "job-application/list",
    component: ListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobApplicationRoutingModule {}
