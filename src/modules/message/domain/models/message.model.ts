export interface Message {
  id?: number;  // Hacer que 'id' sea opcional
  remitente_id: number;
  destinatario_id: number;
  mensaje: string;
  fecha_envio: Date | string;  // Permitir que fecha_envio sea Date o string
}
