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
  idFormulario: number;
  nUspAluno: string;
  nomeAluno: string;
  parecerDado: boolean;
}
