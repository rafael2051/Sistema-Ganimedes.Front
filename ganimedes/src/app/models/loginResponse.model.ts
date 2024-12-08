import { Aluno, Usuario } from './usuario.model';

export class LoginResponse {
  token: string;
  expiration_date: Date; //DateTime
  user_data: Usuario;
  student_data: Aluno;
}
