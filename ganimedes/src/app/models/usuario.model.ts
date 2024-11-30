export interface Usuario {
  nomeCompleto: string;
  nusp: string;
  email: string;
  linkLattes: string;
  perfil: "Aluno" | "Docente" | "CCP";
}

export class Aluno implements Usuario {
  constructor(
    public nomeCompleto: string,
    public nusp: string,
    public email: string,
    public linkLattes: string,
    public perfil: "Aluno" = "Aluno",
    public curso: "Mestrado" | "Doutorado",
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

export class Docente implements Usuario {
  constructor(
    public nomeCompleto: string,
    public nusp: string,
    public email: string,
    public linkLattes: string,
    public perfil: "Docente" | "CCP",
  ) {}
}
