import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PerfilService {
  constructor(private http: HttpClient) {}

  public salvarPerfil(perfil: any) {
    this.http.get("");
  }
}
