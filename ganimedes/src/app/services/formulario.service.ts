import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Aluno } from "../models/usuario.model";

@Injectable({
  providedIn: "root",
})
export class FormularioService {
  constructor(private http: HttpClient) {}

  buscarDadosFormulario(nusp: string) {
    console.log("nusp para a busca dos dados do formulario semestral", nusp);
    return this.http.get<Aluno>("");
  }

  salvarFormulario(form: any) {
    console.log("dados para salvar formulario", form);
    return this.http.post("", form);
  }
}
