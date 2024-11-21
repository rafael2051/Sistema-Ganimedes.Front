import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../models/usuario.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  //TODO: Implementar a URL da API
  private apiUrl = "https://api.exemplo.com/usuario"; // URL da API

  constructor(private http: HttpClient) {}

  // TODO: Implementar a lógica de login
  login(form: any): boolean {
    console.log("valor do form no auth service", form);
    return true;
  }

  //TODO: Implementar uma validação de tipo
  getUsuario(credentials: any): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrl);
  }
}
