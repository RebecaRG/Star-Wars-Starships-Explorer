import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';
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

  constructor(private userService: UserService, private router: Router) { }


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
      localStorage.setItem('email', postData.email!); 
      localStorage.setItem('token', response.accessToken);
      this.router.navigate(['/home']); 
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