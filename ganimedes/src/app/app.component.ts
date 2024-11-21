import { Component } from "@angular/core";
import { Router, RouterModule, RouterOutlet } from "@angular/router";
import { Aluno, Usuario } from "./models/usuario.model";
import { MatIconModule } from "@angular/material/icon";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [MatIconModule, RouterModule, HttpClientModule],
  providers: [AuthService, HttpClient],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "ganimedes";
  usuario: Usuario;

  constructor(private router: Router) {
    this.usuario = new Aluno(
      "Luana",
      "12345678",
      "email@usp.br",
      true,
      "token_teste",
      "https://google.com",
      "ccp", //Mude o perfil aqui para mudar a navbar (Só para testes - o perfil deve vir do backend)
      "Mestrado",
      2022,
      "Aprovado",
      "Aprovado",
      new Date(2023, 10, 9),
      new Date(2025, 10, 9),
      "Marcelo Medeiros Eller",
      "112234456",
      new Date(1999, 11, 31),
      "Brasileiro",
    );
  }

  redirecionaAluno() {
    this.router.navigate([`formulario/${this.usuario.nusp}`]);
  }
}
