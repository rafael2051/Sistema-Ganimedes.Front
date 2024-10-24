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

    }
}
