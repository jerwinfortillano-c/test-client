import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/software', pathMatch: 'full' },
  {
    path: 'software',
    loadChildren: () =>
      import('./modules/software/software.module').then(
        (m) => m.SoftwareModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
