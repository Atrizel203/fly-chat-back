import { User } from "../models/user.model";

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string) : Promise<User[]>;
  create(user: User): Promise<void>;
  findByName(name: string): Promise<User[]>; 
  update(user: User): Promise<void>;
  deleteByName(name: string): Promise<void>;
}
