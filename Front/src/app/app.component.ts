import { Component, Input } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, MatIconModule],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  @Input() textoFormulario: "Formulário" | "Formulários Alunos" = "Formulário";

  constructor() {
    setTimeout(() => (this.textoFormulario = "Formulários Alunos"), 5000);
  }
}
