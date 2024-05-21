import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobApplicationRoutingModule } from './job-application-routing.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobApplicationDetailsComponent } from './view/job-application-details.component';


@NgModule({
  declarations: [
    FormComponent,
    ListComponent,
    JobApplicationDetailsComponent,
  ],
  imports: [
    CommonModule,
    JobApplicationRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class JobApplicationModule { }
