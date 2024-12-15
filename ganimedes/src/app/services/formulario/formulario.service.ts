import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aluno } from '../../models/usuario.model';
import { FormMetaData } from '../../models/formulario.model';

@Injectable({
  providedIn: 'root',
})
export class FormularioService {
  private _urlApi = 'https://localhost:7260';
  private _token = sessionStorage.getItem('token');
  constructor(private http: HttpClient) {}

  buscarDadosFormulario(nusp_aluno: string, nusp_docente: string) {
    return this.http.get<any>(`${this._urlApi}/getForm/${nusp_aluno}`, {
      headers: {
        Authorization: `${this._token}`,
        Nusp: `${nusp_docente}`,
      },
    });
  }

  buscarParecer(idFormulario: number, origem: string, nusp_docente: string) {
    return this.http.get<any>(
      `${this._urlApi}/getParecer/${idFormulario}?origem=${origem}`,
      {
        headers: {
          Authorization: `${this._token}`,
          Nusp: `${nusp_docente}`,
        },
      }
    );
  }

  listarFormularios(nusp_docente: string) {
    return this.http.get<FormMetaData>(`${this._urlApi}/getFormsMetadata`, {
      headers: {
        Authorization: `${this._token}`,
        Nusp: `${nusp_docente}`,
      },
    });
  }

  salvarFormulario(
    tipo_form: string,
    form: any,
    nusp_aluno: any,
    nusp_orientador: any
  ) {
    let formSent: any = {
      aluno: nusp_aluno,
      orientador: nusp_orientador,
      resultado: '',
      dataPreenchimento: new Date(),
    };

    if (tipo_form === 'ALUNO') {
      formSent.artigosEmEscrita = Number(form.artigosEscrita);
      formSent.artigosEmAvaliacao = Number(form.artigosSubmetidos);
      formSent.artigosAceitos = Number(form.artigosAceitos);
      formSent.aprovacoesTodoCurso = Number(form.aprovacoesDesdeInicio);
      formSent.reprovacoesSemestreAtual = Number(form.reprovacoesSemestreAtual);
      formSent.reprovacoesTodoCurso = Number(form.reprovacoesDesdeInicio);
      formSent.atividadesAcademicas = form.atividadesAcademicas;
      formSent.atividadesPesquisa = form.atividadesPesquisa;
      formSent.declaracaoAdicionalComissao = form.declaracaoCCP;
      formSent.dificuldadeApoioCoordenacao =
        form.dificuldades == '1' ? true : false;
      formSent.conceitosDivulgados = form.conceitosDivulgados;
    } else if (tipo_form === 'DOCENTE') {
      formSent.parecerDocente = form.parecerDocente;
    } else if (tipo_form === 'COORDENADOR') {
      formSent.parecerCCP = form.parecerCCP;
    }

    return this.http.post(`${this._urlApi}/postFormulario`, formSent, {
      headers: { Authorization: `${this._token}` },
    });
  }

  salvarParecer(form: any, nusp_docente: string, perfil_usuario: string) {
    const formSent = {
      idFormulario: form.idFormulario,
      parecer: form.parecer,
      origem: perfil_usuario,
      nUspAutorParecer: nusp_docente,
      conceito: form.conceito,
    };
    return this.http.post(`${this._urlApi}/postParecer`, formSent, {
      headers: {
        Authorization: `${this._token}`,
        Nusp: `${nusp_docente}`,
      },
    });
  }
}
