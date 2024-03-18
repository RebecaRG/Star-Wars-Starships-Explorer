import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let router : Router;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['login']);
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy}
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form with empty email and password', () => {
    const loginForm = component.loginForm;
    const emailValue = loginForm.get('email')?.value;
    const passwordValue = loginForm.get('password')?.value;

    expect(loginForm instanceof FormGroup).toBeTrue();
    expect(emailValue).toBe('');
    expect(passwordValue).toBe('');
  });

  it('should login successfully with valid credentials', () => {
    const loginResponse = { accessToken: 'dummy-token' };
    userServiceSpy.login.and.returnValue(of(loginResponse));
    spyOn(router, 'navigateByUrl');

    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('validPassword123');
    component.loginUser();

    expect(userServiceSpy.login.calls.any()).toBeTrue();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should mark form as invalid with empty or invalid inputs', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    
    expect(component.loginForm.invalid).toBeTrue();
  
    component.loginForm.controls['email'].setValue('not-an-email');
    component.loginForm.controls['password'].setValue('123');
    expect(component.loginForm.invalid).toBeTrue();
  });

});
