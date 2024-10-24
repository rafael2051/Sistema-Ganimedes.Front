using System.Text.Json.Serialization;

namespace USP.Ganimedes.API.Model
{
    public class Formulario
    {
        [JsonPropertyName("id_parecer")]
        int IdParecer;

        [JsonPropertyName("aluno")]
        String Aluno = "";

        [JsonPropertyName("orientador")]
        String Orientador = "";

        [JsonPropertyName("resultado")]
        int Resultado;

        [JsonPropertyName("artigos_em_escrita")]
        int ArtigosEmEscrita;

        [JsonPropertyName("artigos_em_avaliacao")]
        int ArtigosEmAvaliacao;

        [JsonPropertyName("artigos_aceitos")]
        int ArtigosAceitos;

        [JsonPropertyName("atividades_academicas")]
        String AtividadesAcademicas = "";

        [JsonPropertyName("atividades_pesquisa")]
        String AtividadesPesquisa = "";

        [JsonPropertyName("declaracao_adicional_comissao")]
        String DeclaracaoAdicionalComissao = "";

        [JsonPropertyName("dificuldade_apoio_coordenacao")]
        bool DificuldadeApoioCoordenacao;

        [JsonPropertyName("data_preenchimento")]
        DateTime DataPreenchimento;

    }
}
