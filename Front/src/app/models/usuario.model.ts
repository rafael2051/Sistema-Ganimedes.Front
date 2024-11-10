export interface Usuario {
  nomeCompleto: string;
  nusp: string;
  email: string;
  logado: boolean;
  token: string;
  linkLattes: string;
  perfil: "aluno" | "docente" | "ccp";
}

export class Aluno implements Usuario {
  constructor(
    public nomeCompleto: string,
    public nusp: string,
    public email: string,
    public logado: boolean,
    public token: string,
    public linkLattes: string,
    public perfil: "aluno" | "docente" | "ccp",
    public curso: "Mestrado" | "Doutoradp",
    public anoIngresso: number,
    public exameProficiencia: "Aprovado" | "Reprovado" | "Não Realizado",
    public exameQualificacao: "Aprovado" | "Reprovado" | "Não Realizado",
    public prazoMaximoQualificacao: Date,
    public prazoMaximoDeposistoTese: Date,
    public orientador: string,
    public rg: string,
    public dataNascimento: Date,
    public nacionalidade: string,
  ) {}
}
