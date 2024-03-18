import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {of, throwError} from 'rxjs';
import { UserService } from '../../services/user.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let router: Router;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['registerUser', 'login']);
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, HttpClientModule, ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: UserService, useValue: userServiceSpy }]
    }).compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call userService.registerUser on valid form submission and navigate to home', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    userServiceSpy.registerUser.and.returnValue(of({ accessToken: 'dummy-token' }));
    userServiceSpy.login.and.returnValue(of({ accessToken: 'dummy-token' }));
    component.registerForm.controls['fullName'].setValue('John Doe');
    component.registerForm.controls['email'].setValue('john@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmPassword'].setValue('Password123');
    
    component.submitDetails();
    fixture.detectChanges();
    
    expect(navigateSpy).toHaveBeenCalledWith('/');
  });

  it('should display error message on failed registration', () => {
    const errorMessage = 'Registration failed';
    userServiceSpy.registerUser.and.returnValue(throwError(() => new Error(errorMessage)));
    component.registerForm.controls['email'].setValue('john@example.com');
    component.submitDetails();

    expect(component.showError).toBeTrue();
    expect(component.errorMessage).toBe(errorMessage);
  });

});
