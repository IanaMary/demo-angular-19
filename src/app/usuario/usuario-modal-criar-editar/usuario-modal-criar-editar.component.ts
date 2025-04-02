import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true, // Define que este componente pode ser usado sem precisar de um módulo específico
  selector: 'usuario-modal-criar-editar', // Nome do seletor para uso no HTML
  templateUrl: './usuario-modal-criar-editar.component.html', // Caminho do template HTML do componente
  styleUrls: ['./usuario-modal-criar-editar.component.sass'], // Caminho do arquivo de estilos
  // Importação dos módulos necessários para o funcionamento do componente
  imports: [MatCardModule, MatButtonModule, CommonModule, MatInputModule, FormsModule, TranslateModule],  
})
export class UsuarioModalCriarEditarComponent implements OnInit {

  constructor(
    private translate: TranslateService, 
    public dialogRef: MatDialogRef<UsuarioModalCriarEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Dados injetados no diálogo (usuário em edição)
  ) {
    // Define o idioma baseado no valor salvo no localStorage, padrão é 'pt'
    const idioma = localStorage.getItem('idioma') || 'pt';
    this.translate.use(idioma);
  }

  ngOnInit(): void { }

  // Método para salvar as alterações do usuário
  salvar() {
    const nomeFormatado = this.formatarNome(this.data.usuarioEditado.nome);
    
    this.data.usuarioEditado.nome = nomeFormatado;

    const emailFormatado = this.gerarEmail(nomeFormatado);
    this.data.usuarioEditado.email = emailFormatado;
    
    this.dialogRef.close(this.data.usuarioEditado); // Fecha o diálogo e retorna os dados editados
  }

  // Método para cancelar a edição do usuário
  cancelar() {
    this.dialogRef.close(); // Fecha o diálogo sem salvar
  }

  /**
   * Formata o nome para remover espaços extras e capitalizar cada palavra.
   * Exemplo: " harry james    potter  " → "Harry James Potter"
   */
  private formatarNome(nome: string): string {
    return nome
      .trim() // Remove espaços extras no início e no fim
      .split(/\s+/) // Divide em palavras, removendo múltiplos espaços
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()) // Capitaliza
      .join(" "); // Junta com espaço único
  }

  /**
   * Gera um e-mail baseado no nome já formatado.
   * Exemplo: "Harry James Potter" → "harry.j.potter@email.com"
   */
  private gerarEmail(nomeFormatado: string): string {
    return nomeFormatado
      .split(" ") // Divide em palavras
      .map((palavra, index, arr) => index === 0 || index === arr.length - 1 ? palavra.toLowerCase() : palavra[0].toLowerCase()) // Mantém o primeiro e último nome completos e usa iniciais no meio
      .join(".") // Junta com "."
      .toLowerCase() // Garante que todo o e-mail fique em letras minúsculas
      + "@email.com"; // Adiciona domínio
  }
}
