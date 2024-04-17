import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from 'src/models/Cliente';
import { LoginStatus } from 'src/models/LoginStatus';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  @Input() clienti?: Cliente[];

  formInserisciCliente: FormGroup;

  isInserisciCliente = true;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.http = http;

    this.formInserisciCliente = formBuilder.group({
      nome: '',
      cognome: '',
      username: '',
      password: '',
      indirizzo: '',
    });
  }

  submitInserisciCliente() {
    const formValues = this.formInserisciCliente.value;
    const body = JSON.stringify(formValues);

    let token = sessionStorage.getItem('token');
    if (token == null) {
      token = '';
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: token as string,
    });

    this.http
      .post<Cliente>('http://localhost:8080/api/cliente/insert', body, {
        headers,
      })
      .subscribe((risposta) => {
        if (!risposta) {
          alert('Errore durante la registrazione');
        } else {
          this.clienti?.push(risposta);
          this.login(formValues.username, formValues.password);
        }

        this.formInserisciCliente.patchValue({
          nome: '',
          cognome: '',
          username: '',
          password: '',
          indirizzo: '',
        });
      });
  }

  login(username: string, password: string) {
    const body = JSON.stringify({ username: username, password: password });
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
          } else if (loginStatus.ruolo == 'CLIENTE') {
            console.log('Indirizzamento verso sezione clienti');
          }
        } else {
          alert('Username e/o Password errati');
        }
      });
  }
}
