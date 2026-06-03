import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationResponse } from '../../models/authentication-response';
import { UsersService } from '../../services/users.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
    });
  }

  login(): void {
    console.log('login() called', this.loginForm.value);
    // mark controls so validation messages appear if inputs are invalid
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const { Email, Password } = this.loginForm.value;
      this.usersService.login(Email, Password).subscribe({
        next: (response: AuthenticationResponse) => {
          this.usersService.setAuthStatus(response.token, response.personName);
          this.router.navigate(['products', 'showcase']);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    } else {
      console.log('login form invalid', this.loginForm.errors, this.loginForm.getRawValue());
    }
  }

  get emailFormControl(): FormControl
  {
    return this.loginForm.get('Email') as FormControl;
  }

  get passwordFormControl(): FormControl
  {
    return this.loginForm.get('Password') as FormControl;
  }
}
