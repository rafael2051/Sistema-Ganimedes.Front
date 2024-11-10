import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  public formPerfil: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formPerfil = this.fb.group({
      nome: [''],
      email: [''],
      senha: [''],
    });
  }
}
