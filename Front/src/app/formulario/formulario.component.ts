import { Component, forwardRef } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
@Component({
  selector: "app-formulario",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: "./formulario.component.html",
  styleUrl: "./formulario.component.scss",
  providers: [],
})
export class FormularioComponent {
  public forms = new FormGroup({
    artigosEscrita: new FormControl(0),
    artigosSubmetidos: new FormControl(0),
    artigosAceitos: new FormControl(0),
    atividadesAcademicas: new FormControl(""),
    atividadesPesquisa: new FormControl(""),
    declaracaoCCP: new FormControl(""),
    dificuldades: new FormControl(""),
  });
  constructor() {}
}
