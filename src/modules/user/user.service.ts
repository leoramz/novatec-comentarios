import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPW } from '../utils';
import { ResponseDto } from '../utils';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<ResponseDto> {
        try {
            let res = new ResponseDto();
            
            let user = await this._userRepository.findOne({ username: createUserDto.username });
            
            if (user) {
                res.error = true;
                res.msg = `Usuario encontrado, intente con otro nombre de usuario.`;
                res.data = "";

                Logger.log('createUser', 'UserService');
                return res;
            }

            user = new User();
            user.username = createUserDto.username;
            user.password = await hashPW(createUserDto.password);

            user = await this._userRepository.save(user);

            Logger.log('createUser', 'createUser');
            return {
                error: false,
                msg: 'Usuario creado exitosamente.',
                data: user
            }
        } catch (error) {
            Logger.error(error, 'createUserService');
            throw {
                error: true,
                msg: 'Ha ocurrido un error.',
                data: error
            }
        }
    }

    async getAllUsers(): Promise<ResponseDto> {
        try {
            const users = await this._userRepository.find();

            Logger.log('getAllUsers', 'UserService');
            return {
                error: false,
                msg: 'Listado de usuarios.',
                data: users
            }
        } catch (error) {
            Logger.error(error, 'getAllUsersService');
            throw {
                error: true,
                msg: 'Ha ocurrido un error.',
                data: error
            }
        }
    }

    async getUserById(id: string): Promise<ResponseDto> {
        try {
            const user: User = await this._userRepository.findOne(id);

            if (!user) {
                Logger.log('getUserById', 'UserService');
                return {
                    error: false,
                    msg: 'Usuario no encontrado.',
                    data: user
                }
            }

            Logger.log('getUserById', 'UserService');
            return {
                error: false,
                msg: 'Usuario encontrado.',
                data: user
            }
        } catch (error) {
            Logger.error(error, 'getUserByIdService');
            throw {
                error: true,
                msg: 'Ha ocurrido un error.',
                data: error
            }
        }
    }

    async getUserByUsername(username: string): Promise<any> {
        const res: User = await this._userRepository.findOne({ username: username });

        Logger.log('getUserByUsername', 'UserService');
        return res;
    }

    async updateUser(id: string, createUserDto: Partial<CreateUserDto>): Promise<ResponseDto> {
        try {
            let res = new ResponseDto();
            let user = await this._userRepository.findOne(id);

            if (!user) {
                res.error = true;
                res.msg = `Usuario no encontrado.`;
                res.data = user;

                Logger.log('updateUser', 'UserService');
                return res;
            }

            user.username = createUserDto.username;
            user.password = await hashPW(createUserDto.password);

            const resU = await this._userRepository.save(user);

            Logger.log('updateUser', 'UserService');
            return {
                error: false,
                msg: 'Usuario actualizado.',
                data: resU
            }
        } catch (error) {
            Logger.error(error, 'updateUserService');
            throw {
                error: true,
                msg: 'Ha ocurrido un error.',
                data: error
            }
        }
    }

    async deleteUser(id: string): Promise<ResponseDto> {
        try {
            let res = new ResponseDto();
            let user = await this._userRepository.findOne(id);

            if (!user) {
                res.error = true;
                res.msg = `Usuario no encontrado.`;
                res.data = user;

                Logger.log('deleteUser', 'UserService');
                return res;
            }

            let resD = await this._userRepository.delete(id);

            Logger.log('deleteUser', 'UserService');
            return {
                error: false,
                msg: 'Usuario eliminado.',
                data: resD
            }
        } catch (error) {
            Logger.error(error, 'deleteUserService');
            throw {
                error: true,
                msg: 'Ha ocurrido un error.',
                data: error
            }
        }
    }
}