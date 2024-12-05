import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import {FormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule,FormsModule,ReactiveFormsModule,CommonModule],
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  email = '';
  password = ''; 
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    this.authService.login({ email: this.loginForm.value.email, password: this.loginForm.value.password }).subscribe({
      next: (data: any) => {
        this.router.navigate(['/board']);
      }, error: (err) => console.log(err)
    });
  }
}
