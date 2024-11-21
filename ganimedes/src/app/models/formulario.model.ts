export class Formulario {
  constructor(
    public id_formulario: string,
    public nusp_aluno: string,
    public orientador: string,
    public artigosEscrita: number,
    public artigosSubmetidos: number,
    public artigosAceitos: number,
    public atividadesAcademicas: string,
    public atividadesPesquisa: string,
    public declaracaoCCP: string,
    public dificuldades: string,
    public conceitosDivulgados: string,
    public aprovadoDocente?:
      | "Aprovado"
      | "Aprovado com ressalvas"
      | "Insatisfatório",
    public aprovadoCCP?:
      | "Aprovado"
      | "Aprovado com ressalvas"
      | "Insatisfatório",
    public parecerDocente?: string,
    public parecerCCP?: string,
  ) {}
}
