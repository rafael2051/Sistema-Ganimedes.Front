import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aluno } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class FormularioService {
  private _urlApi = 'https://localhost:7260';
  private _token = sessionStorage.getItem('token');
  constructor(private http: HttpClient) {}

  buscarDadosFormulario(nusp: string) {
    console.log('nusp para a busca dos dados do formulario semestral', nusp);
    return this.http.get<any>(`${this._urlApi}/getForm/${nusp}`, {
      headers: { Authorization: `${this._token}` },
    });
  }

  listarFormularios(nusp_docente: string) {
    return this.http.post(`${this._urlApi}/getFormsMetadata`, nusp_docente, {
      headers: { Authorization: `${this._token}` },
    });
  }

  salvarFormulario(tipo_form:string, form:any, nusp_aluno:any, nusp_orientador:any) {
    
    let formSent:any = {
      aluno: nusp_aluno,
      orientador: nusp_orientador,
      resultado: "",
      dataPreenchimento: new Date(),
    }
    
    if(tipo_form === 'ALUNO'){
      formSent.artigosEmEscrita = Number(form.artigosEscrita)
      formSent.artigosEmAvaliacao = Number(form.artigosSubmetidos)
      formSent.artigosAceitos = Number(form.artigosAceitos)
      formSent.atividadesAcademicas = form.atividadesAcademicas
      formSent.atividadesPesquisa = form.atividadesPesquisa
      formSent.declaracaoAdicionalComissao = form.declaracaoCCP
      formSent.dificuldadeApoioCoordenacao = form.dificuldades == '1'? true : false
      formSent.conceitosDivulgados = form.conceitosDivulgados
    }else if(tipo_form === 'DOCENTE'){
      formSent.parecerDocente = form.parecerDocente
    }else if(tipo_form === 'COORDENADOR'){
      formSent.parecerCCP = form.parecerCCP
    }
    
    
    console.log('dados para salvar formulario', formSent);
    console.log('tipo do formulario', tipo_form);

    return this.http.post(`${this._urlApi}/postFormulario`, formSent, {
      headers: { Authorization: `${this._token}` },
    });
  }
}
