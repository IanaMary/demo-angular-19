import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';  // Importe o FormsModule
import { UserCardComponent } from './user-card/user-card.component';

@Component({
  selector: 'app-root',
  standalone: true,  // Possibilidade de criar componentes independentes sem precisar de módulos.
  imports: [CommonModule, FormsModule, UserCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'defafio-am53';
  usuarios: any[] = [];  // Lista de usuários
  usuarioEditado: any = null;  // Usuário que está sendo editado
  novoUsuario: any = { nome: '' };  // Objeto para o novo usuário
  mostrarFormularioAdicao = false;  // Variável para controlar a exibição do formulário de adição

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.obterUsuarios();
  }

  // Método para obter usuários
  obterUsuarios() {
    this.userService.obterUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

}
