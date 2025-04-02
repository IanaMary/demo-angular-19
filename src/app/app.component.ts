import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './services/user.service';
import { UserCardComponent } from './user-card/user-card.component';
import { Usuario } from './usuario.model';
import { UserEditarDialogComponent } from './user-editarr-dialog/user-editar-dialog.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, UserCardComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'angular-api-demo';
  usuarios: Usuario[] = [];   // Lista de usuários para exibição
  usuarioEditado: Usuario | null = null;  // Armazena o usuário que está sendo editado, se houver
  novoUsuario: Usuario = { nome: '', email: '' };  // Usado para inicializar um novo usuário
  mostrarFormularioAdicao = false;  // Controle para mostrar ou esconder o formulário de adição

  constructor(private userService: UserService, private dialog: MatDialog, private translate: TranslateService) {
    this.translate.setDefaultLang('pt'); // Idioma padrão
  }

  ngOnInit(): void {
    this.obterUsuarios();  // Inicializa a lista de usuários ao carregar o componente
  }

  mudarIdioma(idioma: string) {
    this.translate.use(idioma);
  }

  // Obtém a lista de usuários do serviço.
  obterUsuarios() {
    this.userService.obterUsuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });
  }

  /**
   * Abre o modal de edição ou adição de usuário.
   * Se um usuário for passado, entra no modo de edição, caso contrário, inicia no modo de adição.
   */
  abrirModalEdicaoOuAdicao(usuario: Usuario | null) {
    // Cria uma cópia do usuário, ou um novo objeto vazio se for adição
    const usuarioEditado = usuario ? { ...usuario } : { nome: '', email: '', foto: '' };
    
    // Abre o modal de edição/adicionar usuário
    const dialogRef = this.dialog.open(UserEditarDialogComponent, {
      width: '400px',
      data: { usuarioEditado },  // Passa os dados para o modal
    });

    // Após o fechamento do modal, lida com a edição ou adição
    dialogRef.afterClosed().subscribe((resultado: Usuario | null) => {
      if (resultado) {
        if (usuario) {
          this.salvarEdicao(resultado);  // Salva as edições se for um usuário existente
        } else {
          this.adicionarUsuario(resultado);  // Adiciona um novo usuário se for o modo de adição
        }
      }
    });
  }

  // Salva a edição de um usuário.
  salvarEdicao(usuarioEditado: Usuario) {
    const email =  usuarioEditado.nome.replace(/\s+/g, "").toLowerCase();;
    usuarioEditado.email = `${email}@email.com` 
    this.userService.editarUsuario(usuarioEditado.id!, usuarioEditado).subscribe((usuarioAtualizado: Usuario) => {
      const index = this.usuarios.findIndex(usuario => usuario.id === usuarioAtualizado.id);
      if (index !== -1) {
        this.usuarios[index] = usuarioAtualizado;  // Atualiza a lista com o usuário editado
      }
    });
  }

  // Cancela a edição ou adição de usuário.
  cancelar() {
    this.usuarioEditado = null;
  }

  // Alterna a visibilidade do formulário de adição de usuário.
  alternarFormularioAdicao() {
    this.mostrarFormularioAdicao = !this.mostrarFormularioAdicao;
  }

  //  Adiciona um novo usuário.
  adicionarUsuario(usuario: Usuario) {
    if (usuario.nome) {
      const email =  usuario.nome.replace(/\s+/g, "").toLowerCase();;
      usuario.email = `${email}@email.com` 
      this.userService.adicionarUsuario(usuario).subscribe((usuarioAdicionado: Usuario) => {
        this.usuarios.unshift(usuarioAdicionado);  // Adiciona o novo usuário à lista
        this.novoUsuario = { nome: '', email: '' };  // Reseta o formulário de novo usuário
        this.mostrarFormularioAdicao = false;  // Fecha o formulário de adição
      });
    }
  }

  // Exclui um usuário baseado no seu ID.
  excluirUsuario(idUsuario: number) {
    this.userService.excluirUsuario(idUsuario).subscribe(() => {
      this.usuarios = this.usuarios.filter(usuario => usuario.id !== idUsuario);  // Remove o usuário da lista
    });
  }
}
