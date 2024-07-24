export interface Payment {
    id: number;
    usuario_id: number;
    monto: number;
    fecha_pago: Date;
    metodo_pago: string;
  }
  