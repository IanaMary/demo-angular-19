export interface Usuario {
                id?: number;       
                nome: string;
                email: string;
                foto?: string;      // Foto é opcional, pois o usuário pode não ter uma foto
}
