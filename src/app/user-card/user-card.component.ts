import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,  // Define o componente como standalone, permitindo seu uso sem precisar de um módulo Angular.
  selector: 'user-card',  // Define o seletor para ser utilizado no HTML de outros componentes.
  templateUrl: 'user-card.component.html',  // Especifica o arquivo do template HTML do componente.
  styleUrl: 'user-card.component.sass',  // Define o arquivo de estilos utilizado pelo componente.
  imports: [MatCardModule, MatButtonModule, CommonModule, TranslateModule],  // Lista os módulos necessários para o funcionamento do componente.
  changeDetection: ChangeDetectionStrategy.OnPush,  // Usa a estratégia OnPush para otimizar a detecção de mudanças, melhorando a performance.
})
export class UserCardComponent {
  
  // Propriedade de entrada que recebe os dados do usuário a ser exibido.
  @Input() usuario: any;

  // Eventos de saída para notificar o componente pai sobre ações de edição e exclusão.
  @Output() editarUsuarioEmit = new EventEmitter<any>();
  @Output() excluirUsuarioEmit = new EventEmitter<any>();

  constructor(private translate: TranslateService) {
    // Define o idioma do TranslateService com base no valor armazenado no localStorage, padrão para 'pt'.
    const idioma = localStorage.getItem('idioma') || 'pt';
    this.translate.use(idioma);
  }

  // Método para emitir o evento de edição, enviando o usuário como parâmetro.
  editarUsuario(usuario: any) {
    this.editarUsuarioEmit.emit(usuario);
  }

  // Método para emitir o evento de exclusão, enviando o ID do usuário.
  excluirUsuario(usuarioId: any) {
    this.excluirUsuarioEmit.emit(usuarioId);
  }
}
