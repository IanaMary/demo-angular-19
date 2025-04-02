import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,  // Define o componente como standalone, ou seja, pode ser usado sem a necessidade de um módulo.
  selector: 'user-card',  // Nome do seletor para o componente.
  templateUrl: 'user-card.component.html',  // Caminho para o template HTML do componente.
  styleUrl: 'user-card.component.sass',  // Caminho para o arquivo de estilo do componente.
  imports: [MatCardModule, MatButtonModule, CommonModule, TranslateModule],  // Importações necessárias para o componente.
  changeDetection: ChangeDetectionStrategy.OnPush,  // Otimiza a detecção de mudanças, atualizando apenas quando necessário.
})
export class UserCardComponent {
  
  // Entrada para o componente: recebe um usuário que será exibido.
  @Input() usuario: any;

  // Saídas para emitir eventos de edição e exclusão do usuário.
  @Output() editarUsuarioEmit = new EventEmitter<any>();
  @Output() excluirUsuarioEmit = new EventEmitter<any>();

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('pt'); // Idioma padrão
  }

  // Função para emitir o evento de edição de usuário.
  editarUsuario(usuario: any) {
    this.editarUsuarioEmit.emit(usuario);  // Emite o evento de edição passando o usuário como dado.
  }

  // Função para emitir o evento de exclusão de usuário.
  excluirUsuario(usuarioId: any) {
    this.excluirUsuarioEmit.emit(usuarioId);  // Emite o evento de exclusão passando o id do usuário.
  }
}
