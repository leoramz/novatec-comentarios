import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { ResponseDto } from '../utils';
import { ComentarioRepository } from './comentario.repository';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { Comentario } from './entity/comentario.entity';

@Injectable()
export class ComentarioService {
    constructor(
        @InjectRepository(ComentarioRepository)
        private readonly _comentarioRepository: ComentarioRepository,
        @InjectRepository(UserRepository)
        private readonly _userService: UserRepository,
        
    ) {}

    async createComentario(createComentarioDto: CreateComentarioDto): Promise<ResponseDto> {
        try {
            let comentario = new Comentario();
            const user = await this._userService.findOne(createComentarioDto.subject);

            if (!user) {
                Logger.log('getComentarioById', 'ComentarioService');
                return {
                    error: false,
                    msg: 'Usuario no encontrado.',
                    data: user
                }
            }

            comentario.subject = user;
            comentario.website = createComentarioDto.website;
            comentario.text = createComentarioDto.text;
            comentario.email = createComentarioDto.email;

            comentario = await this._comentarioRepository.save(comentario);

            Logger.log('createComentario', 'ComentarioService');
            return {
                error: false,
                msg: 'Usuario creado exitosamente.',
                data: comentario
            }
        } catch (error) {
            Logger.error(error, 'createComentarioService');
            throw {
                error: true,
                msg: 'Ha ocurrido un error.',
                data: error
            }
        }
    }

    async getAllComentarios(): Promise<ResponseDto> {
        try {
            const comentarios = await this._comentarioRepository.find();

            Logger.log('getAllComentarios', 'ComentarioService');
            return {
                error: false,
                msg: 'Listado de comentarios.',
                data: comentarios
            }
        } catch (error) {
            Logger.error(error, 'getAllComentariosService');
            throw {
                error: true,
                msg: 'Ha ocurrido un error.',
                data: error
            }
        }
    }

    async getComentarioById(id: string): Promise<ResponseDto> {
        try {
            const comentario = await this._comentarioRepository.findOne(id);

            if (!comentario) {
                Logger.log('getComentarioById', 'ComentarioService');
                return {
                    error: false,
                    msg: 'Comentario no encontrado.',
                    data: comentario
                }
            }

            Logger.log('getComentarioById', 'ComentarioService');
            return {
                error: false,
                msg: 'Comentario encontrado.',
                data: comentario
            }
        } catch (error) {
            Logger.error(error, 'getComentarioByIdService');
            throw {
                error: true,
                msg: 'Ha ocurrido un error.',
                data: error
            }
        }
    }

    async updateComentario(id: string, createComentarioDto: Partial<CreateComentarioDto>): Promise<ResponseDto> {
        try {
            let res = new ResponseDto();
            let comentario = await this._comentarioRepository.findOne(id);

            if (!comentario) {
                res.error = true;
                res.msg = `Comentario no encontrado.`;
                res.data = comentario;

                Logger.log('updateComentario', 'ComentarioService');
                return res;
            }

            const user = await this._userService.findOne(createComentarioDto.subject);

            if (!user) {
                Logger.log('getComentarioById', 'ComentarioService');
                return {
                    error: false,
                    msg: 'Usuario no encontrado.',
                    data: user
                }
            }

            comentario.subject = user;
            comentario.website = createComentarioDto.website;
            comentario.text = createComentarioDto.text;
            comentario.email = createComentarioDto.email;

            const resU = await this._comentarioRepository.save(comentario);

            Logger.log('updateComentario', 'ComentarioService');
            return {
                error: false,
                msg: 'Comentario actualizado.',
                data: resU
            }
        } catch (error) {
            Logger.error(error, 'updateComentarioService');
            throw {
                error: true,
                msg: 'Ha ocurrido un error.',
                data: error
            }
        }
    }

    async deleteComentario(id: string): Promise<ResponseDto> {
        try {
            let res = new ResponseDto();
            let comentario = await this._comentarioRepository.findOne(id);

            if (!comentario) {
                res.error = true;
                res.msg = `Comentario no encontrado.`;
                res.data = comentario;

                Logger.log('deleteComentario', 'ComentarioService');
                return res;
            }

            let resD = await this._comentarioRepository.delete(id);

            Logger.log('deleteComentario', 'ComentarioService');
            return {
                error: false,
                msg: 'Comentario eliminado.',
                data: resD
            }
        } catch (error) {
            Logger.error(error, 'deleteComentarioService');
            throw {
                error: true,
                msg: 'Ha ocurrido un error.',
                data: error
            }
        }
    }
}