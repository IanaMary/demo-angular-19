import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-user-editar-dialog',
  templateUrl: './user-editar-dialog.component.html',
  styleUrls: ['./user-editar-dialog.component.sass'],
  // Importação dos módulos necessários, incluindo FormsModule para utilizar ngModel
  imports: [MatCardModule, MatButtonModule, CommonModule, MatInputModule, FormsModule, TranslateModule],  
})
export class UserEditarDialogComponent implements OnInit {

  // Injeção de dependências do MatDialogRef (para controlar o dialog) e MAT_DIALOG_DATA (para obter dados do dialog)
  constructor(
    private translate: TranslateService,
    public dialogRef: MatDialogRef<UserEditarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const idioma = localStorage.getItem('idioma') || 'pt';
    this.translate.use(idioma);
  }

  // Função ngOnInit() vazia, não utilizada neste exemplo, mas preparada para uso futuro.
  ngOnInit(): void { }

  // Método para salvar as alterações e fechar o dialog, retornando os dados editados
  salvar() {
    this.dialogRef.close(this.data.usuarioEditado); 
  }

  // Método para cancelar a edição e fechar o dialog sem salvar alterações
  cancelar() {
    this.dialogRef.close();
  }
}
