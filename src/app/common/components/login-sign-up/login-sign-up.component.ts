import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginSignUpService } from '../../../servide/login-sign-up.service';

@Component({
  selector: 'app-login-sign-up',
  standalone: false,
  templateUrl: './login-sign-up.component.html',
  styleUrl: './login-sign-up.component.css'
})
export class LoginSignUpComponent {
  loginForm: FormGroup = new FormGroup({});
  constructor( 
    private loginSignUpService: LoginSignUpService
  ) { 
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmitLogin() {
    if (this.loginForm.valid) {
      // console.log('Form Data:', this.loginForm.value);
      this.loginSignUpService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Handle successful login here, e.g., redirect to homepage
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Handle login error here, e.g., show an error message
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
