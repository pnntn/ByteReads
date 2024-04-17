import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from 'src/models/Cliente';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  @Input() clienti? : Cliente[];

  formInserisciCliente : FormGroup;

  isInserisciCliente = true;

  constructor(private http : HttpClient, private formBuilder : FormBuilder){
    this.http = http;

    this.formInserisciCliente = formBuilder.group(
      {
        nome : "",
        cognome : "",
        username : "",
        password : "",
        indirizzo : ""
      }
    )
  }

  submitInserisciCliente(){
    const formValues = this.formInserisciCliente.value;
    const body = JSON.stringify(formValues);

    let token = sessionStorage.getItem("token");
    if(token == null){
      token = "";
    }
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'token': token as string
      }
    );

    this.http.post<Cliente>("http://localhost:8080/api/cliente/insert", body, {headers}).subscribe(risposta =>{
      if(!risposta){
        alert("Errore durante la registrazione");
      }
      else{
        this.clienti?.push(risposta);
      }

      this.formInserisciCliente.patchValue(
        {
          nome : "",
          cognome : "",
          username : "",
          password : "",
          indirizzo : ""
        }
      )
    })
  }

}
