import { Message } from "../models/message.model";

export interface MessageRepository {
  findAll(): Promise<Message[]>;
  findById(id: number): Promise<Message | null>;
  findByUserId(userId: number): Promise<Message[]>; 
  
  create(message: Message): Promise<void>;
  delete(id: number): Promise<void>;
}
