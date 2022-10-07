import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {ProgressBarModule} from 'primeng/progressbar';
import { CheckboxModule } from 'primeng/checkbox';
import { SoftwareRoutingModule } from './software-routing.modules';
import { SofwareActivatedRoute } from './software-router.activate';
import { SecurityActivateRoute } from './security-route.activate';

import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { ChangePasswordComponent } from 'src/app/components/change-password/change-password.component';
import { CvDetailComponent } from 'src/app/components/cv-detail/cv-detail.component';
import { GoalDetailComponent } from 'src/app/components/goal-detail/goal-detail.component';
import { GoalsComponent } from 'src/app/components/goals/goals.component';
import { SoftwareComponent } from './software.component';
import { HomeComponent } from 'src/app/components/home/home.component';

import { CareerGoalService } from 'src/app/services/career-goal/career-goal.service';


@NgModule({
  declarations: [
    SoftwareComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    CvDetailComponent,
    GoalDetailComponent,
    GoalsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SoftwareRoutingModule,
    ButtonModule,
    TabViewModule,
    CardModule,
    InputTextModule,
    CalendarModule,
    TableModule,
    DropdownModule,
    InputNumberModule,
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextareaModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressBarModule,
  ],
  providers: [
    SofwareActivatedRoute,
    SecurityActivateRoute,
    DialogService,
    MessageService,
    ConfirmationService,
    DatePipe,
    DynamicDialogRef,
    DynamicDialogConfig,
    CareerGoalService
  ]
})
export class SoftwareModule { }
