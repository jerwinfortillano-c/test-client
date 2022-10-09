import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SoftwareComponent } from './software.component';

import { LoginComponent } from 'src/app/components/login/login.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { CvDetailComponent } from 'src/app/components/cv-detail/cv-detail.component';
import { GoalsComponent } from 'src/app/components/goals/goals.component';

import { SofwareActivatedRoute } from './software-router.activate';
import { SecurityActivateRoute } from './security-route.activate';


const routes: Routes = [
  {
    path: '',
    component: SoftwareComponent,
    children: [
      { path: '', canActivate: [SecurityActivateRoute], component: LoginComponent},
      { path: 'home', canActivate: [SofwareActivatedRoute], component: HomeComponent},
      {path: 'cv-detail', canActivate: [SofwareActivatedRoute], component: CvDetailComponent},
      {path: 'career-goals', canActivate: [SofwareActivatedRoute], component: GoalsComponent},
    ]
  },
  { path: '**', redirectTo: '/software'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SoftwareRoutingModule { }

