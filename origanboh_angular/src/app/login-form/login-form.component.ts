import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginStatus } from 'src/models/LoginStatus';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.http = http;
    this.loginForm = formBuilder.group({
      username: '',
      password: '',
    });
  }

  submitForm() {
    const formValues = this.loginForm.value;
    console.log(formValues);

    const body = JSON.stringify(formValues);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post('http://localhost:8080/api/login/signin', body, { headers })
      .subscribe((risposta) => {
        console.log(risposta);

        let loginStatus: LoginStatus = risposta as LoginStatus;

        if (loginStatus.ruolo != 'NONE') {
          sessionStorage.setItem('token', loginStatus.token);
          if (loginStatus.ruolo == 'ADMIN') {
            console.log('Indirizzamento verso sezione ADMIN');
            //TODO
            //window.location.href="/sezioneAdmin"
          } else if (loginStatus.ruolo == 'CLIENTE') {
            console.log('Indirizzamento verso sezione clienti');
            //TODO
            //window.location.href="/sezioneCliente"
          }
        } else {
          alert('Username e/o Password errati');
        }
      });
  }
}
