import { MySQLUserRepository } from '../../infrastructure/adapters/mysql/user.repository.impl';
import { CreateUserUseCase } from './create-user.usecase';
import { GetUserByIdUseCase } from './get-user-by-id.usecase';
import { DeleteUserByNameUseCase } from './delete-user-by-name.usecase';
import { GetUsersByNameUseCase } from './get-user-by-name.usecase';
import { GetAllUsersUseCase } from './get-all-users.usecase';
import { UpdateUserUseCase } from './update-user.usecase';
import { AuthenticateUserUseCase } from './authenticate-user.usecase';

const userRepository = new MySQLUserRepository();

export const createUserUseCase = new CreateUserUseCase(userRepository);
export const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
export const deleteUserByNameUseCase = new DeleteUserByNameUseCase(userRepository);
export const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
export const getUsersByNameUseCase = new GetUsersByNameUseCase(userRepository)
export const updateUserUseCase = new UpdateUserUseCase(userRepository);
export const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository); 