import { Component, Input, Output} from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router) { }
 
  get email(){
    return this.loginForm.get('email') as FormControl;
  }

  get password(){
    return this.loginForm.get('password') as FormControl;
  }

  loginForm = new FormGroup({
    'email' : new FormControl('', [Validators.required, Validators.email]),
    'password' : new FormControl ('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{3,}$/)])
  });

  loginUser(){
    const { email, password } = this.loginForm.value;
  
    if (typeof email === 'string' && typeof password === 'string') {
      this.userService.login(email, password).subscribe(
        response => {
          if(response.accessToken){
            localStorage.setItem('email', email); 
            localStorage.setItem('token', response.accessToken); 
            this.router.navigate(['/home']);
          }else{
            alert("Invalid credentials");
          }
        },
        error => {
          alert("Something went wrong");
        }
      )
    } else {
      alert("Please fill in all fields");
    }
  }

  
}

