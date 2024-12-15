export class Formulario {
  idFormulario?: number;
  aluno: string; //nusp do aluno
  nomeAluno: string;
  orientador: string; //nusp do orientador
  artigosEmEscrita: number;
  artigosEmAvaliacao: number;
  artigosAceitos: number;
  atividadesAcademicas: string;
  atividadesPesquisa: string;
  declaracaoAdicionalComissao: string;
  dificuldadeApoioCoordenacao: boolean;
  dataPreenchimento: Date;
  conceitosDivulgados?: string;
  aprovacoesTodoCurso: number;
  reprovacoesSemestreAtual: number;
  reprovacoesTodoCurso: number;
}

export class FormMetaData {
  id_formulario: number;
  nusp_luno: string;
  nome_aluno: string;
  parecer_dado: boolean;
}
