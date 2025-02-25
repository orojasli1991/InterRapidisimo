import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SubjectsSelectionComponent  } from './subjects-selection/subjects-selection.component';
import { StudentsComponent } from './students/students.component';
import {StudentsClassDetailsComponent}from './students-class-details/students-class-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'subjects-selection', component: SubjectsSelectionComponent  },
  { path: 'students', component: StudentsComponent  },
  { path: 'students-class-details', component: StudentsClassDetailsComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirección por defecto
  { path: '**', redirectTo: '/login' } // Manejo de rutas no existentes
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}