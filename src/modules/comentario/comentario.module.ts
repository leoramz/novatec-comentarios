import { Module } from '@nestjs/common';
import { ComentarioRepository } from './comentario.repository';
import { ComentarioController } from './comentario.controller';
import { ComentarioService } from './comentario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([ComentarioRepository]),
        TypeOrmModule.forFeature([UserRepository]),
        UserModule
    ],
    providers: [ComentarioService],
    controllers: [ComentarioController]
})
export class ComentarioModule { }