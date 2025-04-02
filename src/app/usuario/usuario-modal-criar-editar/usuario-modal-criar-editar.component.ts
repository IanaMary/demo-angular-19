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

  // Injeção de dependências:
  // - `MatDialogRef`: Referência do diálogo, usada para fechá-lo
  // - `MAT_DIALOG_DATA`: Dados passados para o diálogo (no caso, o usuário a ser editado)
  constructor(
    private translate: TranslateService, 
    public dialogRef: MatDialogRef<UsuarioModalCriarEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Dados injetados no diálogo (usuário em edição)
  ) {
    // Define o idioma baseado no valor salvo no localStorage, padrão é 'pt'
    const idioma = localStorage.getItem('idioma') || 'pt';
    this.translate.use(idioma);
  }

  // Método do ciclo de vida do Angular, pode ser usado para inicializações (atualmente não utilizado)
  ngOnInit(): void { }

  // Método chamado ao salvar as alterações no usuário
  salvar() {
    this.dialogRef.close(this.data.usuarioEditado); // Fecha o diálogo e retorna os dados editados
  }

  // Método chamado ao cancelar a edição do usuário
  cancelar() {
    this.dialogRef.close(); // Fecha o diálogo sem salvar
  }
}
