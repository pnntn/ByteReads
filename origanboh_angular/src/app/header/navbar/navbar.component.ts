import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor() {}

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
}
