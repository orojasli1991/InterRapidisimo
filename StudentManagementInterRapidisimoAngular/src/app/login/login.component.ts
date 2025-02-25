import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule]
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMessage: string = '';
  
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
      this.loginForm = this.fb.group({
        username: ['', [Validators.required, Validators.email]]
      });
    }
    ngOnInit(): void {

      this.destroyjwt();
    }
    destroyjwt(){
      localStorage.clear();
    }
    login() {
      if (this.loginForm.valid) {
        this.authService.login(this.loginForm.value).subscribe({
          next: () => this.router.navigate(['/subjects-selection']), 
          error: (err: any) => this.errorMessage = err.error.message || 'usuario no registrado',
        });
      }
    }
  }
