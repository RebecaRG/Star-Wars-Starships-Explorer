import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(public userService: UserService, private router: Router, public route: ActivatedRoute) { }

  showAlert: boolean = false;
  alertMessage: string = "";

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  loginForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{3,}$/)])
  });

  loading = false;

  loginUser() {
    const { email, password } = this.loginForm.value;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    if (typeof email === 'string' && typeof password === 'string') {
      this.userService.login(email, password).subscribe({
        next: (response) => {
          if (response && response.accessToken) {
            localStorage.setItem('email', email);
            localStorage.setItem('token', response.accessToken);
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
          }
        },
        error: (error) => {
          this.showAlert = true;
          this.alertMessage = error.message;
          this.loading = false;
        }
      });
    }
  }

  closeAlert() {
    this.showAlert = false;
  }
}




