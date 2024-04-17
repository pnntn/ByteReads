import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  isClient(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token && token.split('-')[0] === 'CLIENTE';
  }

  isAdmin(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token && token.split('-')[0] === 'ADMIN';
  }

  logout() {
    
    sessionStorage.clear();

    this.router.navigate(['/']);
    
    console.log('Logged out');
  }

}
