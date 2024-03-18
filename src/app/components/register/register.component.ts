import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../shared/password-match.directive';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  showError: boolean = false;
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }


  get fullName(){
    return this.registerForm.get('fullName') as FormControl;
  }

  get email(){
    return this.registerForm.get('email') as FormControl;
  }

  get password(){
    return this.registerForm.get('password') as FormControl;
  }

  get confirmPassword(){
    return this.registerForm.get('confirmPassword') as FormControl;
  }


  registerForm = new FormGroup({
    'fullName': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]),
    'email' : new FormControl('', [Validators.required, Validators.email]),
    'password' : new FormControl ('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{3,}$/)]),
    'confirmPassword' : new FormControl ('', [Validators.required]),
  }, {
    validators: passwordMatchValidator
  });


  submitDetails() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this.userService.registerUser(postData as User).subscribe({
      next: (response) => {
        this.userService.login(postData.email!, postData.password!).subscribe({
          next: (loginResponse) => {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
            localStorage.setItem('email', postData.email!); 
            localStorage.setItem('token', response.accessToken);
          },
          error: (loginError) => {
            console.error('Error logging in after registration:', loginError);
          }
        });
      },
      error: (error) => {
        this.showError = true;
        this.errorMessage = error.message;
      }
    });
  }
  

  closeAlert() {
    this.showError = false;
  }

}