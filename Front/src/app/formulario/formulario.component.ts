import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-formulario",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: "./formulario.component.html",
  styleUrl: "./formulario.component.scss",
})
export class FormularioComponent implements OnInit {
  forms: FormGroup;
  data: any;
  constructor(private fb: FormBuilder) {
    this.forms = this.fb.group({
      artigosEscrita: [0, Validators.required],
      artigosSubmetidos: [0, Validators.required],
      artigosAceitos: [0, Validators.required],
      atividadesAcademicas: ["", Validators.required],
      atividadesPesquisa: ["", Validators.required],
      declaracaoCCP: ["", Validators.required],
      dificuldades: ["", Validators.required],
      conceitosDivulgados: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.getData();
  }

  private getData(): void {}

  public sendForm(): void {}

  blockNonNumberInput(event: any) {
    const allowedCharacters = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "Tab",
    ];
    if (!allowedCharacters.find((item) => item === event.key)) {
      event.preventDefault();
    }
  }
}
