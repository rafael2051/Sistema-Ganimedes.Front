import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aluno } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class FormularioService {
  private _urlApi = 'http://localhost:5000/Formulario';
  private _token = sessionStorage.getItem('token');
  constructor(private http: HttpClient) {}

  buscarDadosFormulario(nusp: string) {
    console.log('nusp para a busca dos dados do formulario semestral', nusp);
    return this.http.get<Aluno>(`${this._urlApi}/getForm/${nusp}`, {
      headers: { Authorization: `Bearer ${this._token}` },
    });
  }

  listarFormularios(nusp_docente: string) {
    return this.http.post(`${this._urlApi}/getFormsMetadata`, nusp_docente, {
      headers: { Authorization: `Bearer ${this._token}` },
    });
  }

  salvarFormulario(form: any) {
    console.log('dados para salvar formulario', form);
    return this.http.post(`${this._urlApi}/salvarFormulario`, form, {
      headers: { Authorization: `Bearer ${this._token}` },
    });
  }
}
