declare module '../../../rabbitmq/mqtt-connection' {
    export function sendMessageToQueue(message: {
      remitente_id: number;
      destinatario_id: number;
      mensaje: string;
      fecha_envio: string;
    }): void;
  }
  