import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Aluno, Usuario } from "../models/usuario.model";

@Injectable({
  providedIn: "root",
})
export class FormularioService {
  constructor(private http: HttpClient) {}

  buscarDadosAluno(nusp: string) {
    return this.http.get<Aluno>("");
  }
}
