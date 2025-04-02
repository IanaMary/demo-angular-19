import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioCardComponent } from './usuario/usuario-card/usuario-card.component';
import { Usuario } from './usuario.model';
import { UserEditarDialogComponent } from './user-editarr-dialog/user-editar-dialog.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UsuarioService } from './usuario/services/usuario.service';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, UsuarioCardComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'angular-api-demo';

  // Lista de usuários exibidos na interface
  usuarios: Usuario[] = [];   

  // Armazena temporariamente um usuário que está sendo editado
  usuarioEditado: Usuario | null = null;  

  // Estrutura base para criar um novo usuário
  novoUsuario: Usuario = { nome: '', email: '' };  

  // Controle para exibir ou ocultar o formulário de adição
  mostrarFormularioAdicao = false;  

  constructor(
    private usuariooService: UsuarioService, 
    private dialog: MatDialog, 
    private translate: TranslateService
  ) {}

  // Método executado ao iniciar o componente
  ngOnInit(): void {
    this.obterUsuarios();  
  }

  // Método para mudar o idioma da aplicação e salvar a preferência no localStorage
  mudarIdioma(idioma: string) {
    localStorage.setItem('idioma', idioma);
    this.translate.use(idioma);
  }

  // Obtém a lista de usuários do serviço
  obterUsuarios() {
    this.usuariooService.obterUsuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });
  }

  /**
   * Abre o modal para edição ou adição de usuário.
   * Se um usuário for passado, entra no modo de edição.
   * Se for `null`, inicia no modo de adição.
   */
  abrirModalEdicaoOuAdicao(usuario: Usuario | null) {
    // Cria um novo objeto para evitar alterações diretas no original
    const usuarioEditado = usuario ? { ...usuario } : { nome: '', email: '', foto: '' };
    
    // Abre o modal de edição/adicionar usuário
    const dialogRef = this.dialog.open(UserEditarDialogComponent, {
      width: '400px',
      data: { usuarioEditado },  
    });

    // Após o fechamento do modal, verifica se houve edição ou adição de usuário
    dialogRef.afterClosed().subscribe((resultado: Usuario | null) => {
      if (resultado) {
        usuario ? this.salvarEdicao(resultado) : this.adicionarUsuario(resultado);
      }
    });
  }

  // Atualiza os dados de um usuário existente
  salvarEdicao(usuarioEditado: Usuario) {
    // Gera um e-mail baseado no nome do usuário removendo espaços e convertendo para minúsculas
    const email = usuarioEditado.nome.replace(/\s+/g, "").toLowerCase();
    usuarioEditado.email = `${email}@email.com`; 

    this.usuariooService.editarUsuario(usuarioEditado.id!, usuarioEditado).subscribe((usuarioAtualizado: Usuario) => {
      const index = this.usuarios.findIndex(u => u.id === usuarioAtualizado.id);
      if (index !== -1) {
        this.usuarios[index] = usuarioAtualizado;  // Atualiza a lista com os novos dados
      }
    });
  }

  // Cancela a edição do usuário
  cancelar() {
    this.usuarioEditado = null;
  }

  // Alterna a visibilidade do formulário de adição de usuário
  alternarFormularioAdicao() {
    this.mostrarFormularioAdicao = !this.mostrarFormularioAdicao;
  }

  // Adiciona um novo usuário à lista
  adicionarUsuario(usuario: Usuario) {
    if (usuario.nome) {
      const email = usuario.nome.replace(/\s+/g, "").toLowerCase();
      usuario.email = `${email}@email.com`;

      this.usuariooService.adicionarUsuario(usuario).subscribe((usuarioAdicionado: Usuario) => {
        this.usuarios.unshift(usuarioAdicionado);  // Insere o novo usuário no topo da lista
        this.novoUsuario = { nome: '', email: '' };  // Reseta os campos do formulário
        this.mostrarFormularioAdicao = false;  // Fecha o formulário de adição
      });
    }
  }

  // Exclui um usuário da lista baseado no seu ID
  excluirUsuario(idUsuario: number) {
    this.usuariooService.excluirUsuario(idUsuario).subscribe(() => {
      this.usuarios = this.usuarios.filter(usuario => usuario.id !== idUsuario);  // Remove o usuário da lista
    });
  }
}
