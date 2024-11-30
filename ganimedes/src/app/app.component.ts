import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
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
  token = sessionStorage.getItem("token");
  perfil = sessionStorage.getItem("perfil");
  usuario = sessionStorage.getItem("usuario");

  constructor(private router: Router) {}

  redirecionaAluno() {
    //TODO: pegar o nusp que está no session storage
    this.router.navigate([`formulario/12312312`]);
  }

  deslogarUsuario() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("perfil");
    sessionStorage.removeItem("usuario");
    this.router.navigate(["login"]);
  }
}
