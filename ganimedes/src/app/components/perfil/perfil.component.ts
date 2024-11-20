import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-perfil",
  standalone: true,
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },

    provideNativeDateAdapter(),
  ],
  imports: [
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./perfil.component.html",
  styleUrl: "./perfil.component.css",
})
export class PerfilComponent {
  public formPerfil: FormGroup;
  public edicaoDesabilitada = false;

  public curso = "";

  public orientadores = [
    "Jaiminho, o carteiro",
    "Mestre Yoda",
    "Doutor Estranho",
  ];

  constructor(private fb: FormBuilder) {
    this.formPerfil = this.fb.group({
      email: "",
      linkLattes: "",
      dtLattes: "",
      curso: "",
      anoIngresso: 0,
      exameProficiencia: "",
      exameQualificacao: "",
      prazoQualificacao: "",
      prazoTese: "",
      orientador: "",
    });
  }
}
