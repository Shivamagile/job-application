import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthModule } from "./auth/auth.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { JobApplicationModule } from "./job-application/job-application.module";
import { AuthGuard } from "./common/guard/auth.guard";
import { JobApplicationDetailsComponent } from "./job-application/view/job-application-details.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => AuthModule,
  },
  {
    path: "",
    loadChildren: () => JobApplicationModule,
  },
  {
    path: "",
    loadChildren: () => DashboardModule,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
