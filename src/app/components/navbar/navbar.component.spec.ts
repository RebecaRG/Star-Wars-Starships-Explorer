import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { NavbarComponent } from './navbar.component';
import { RouterOutlet } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NavbarComponent] 
    }).compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to /home', () => {
    const homeLinkDe = fixture.debugElement.query(By.css('a[routerLink="/home"]'));
    expect(homeLinkDe).not.toBeNull();
    expect(homeLinkDe.nativeElement.getAttribute('routerLink')).toBe('/home');
  });

  it('should have a link to /starships', () => {
    const starshipsLinkDe = fixture.debugElement.query(By.css('a[routerLink="/starships"]'));
    expect(starshipsLinkDe).not.toBeNull();
    expect(starshipsLinkDe.nativeElement.getAttribute('routerLink')).toBe('/starships');
  });

  it('should have router-outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).not.toBeNull();
  });
});
