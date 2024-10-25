using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.Text.Json.Nodes;
using USP.Ganimedes.API.Model;

namespace USP.Ganimedes.API.Controllers
{
    [ApiController]
    [Route("/ganimedes")]
    public class GanimedesController : ControllerBase
    {

        [HttpPost("/postFormulario")]
        public IActionResult ReceberFormulario([FromBody] Formulario Formulario)
        {

            

            return StatusCode(200);
        }

        [HttpGet("/getFormulario/{nusp:int}")]
        public async Task<IActionResult> BuscarFormulario(int nusp)
        {
            var formulario = await _ganimedesAppService.ObterFormularioPorNusp(nusp);

            if (formulario == null)
            {
                return NotFound(new { mensagem = "Formulário não encontrado para o NUSP fornecido." });
            }

            return StatusCode(200);
        }
    }
}
