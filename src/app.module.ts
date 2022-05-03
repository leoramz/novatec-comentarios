import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entity/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ComentarioModule } from './modules/comentario/comentario.module';
import { Comentario } from './modules/comentario/entity/comentario.entity';

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: !ENV ? '.env.local' : `.env.${ENV}`
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'novatec',
            password: 'novatec',
            database: 'novatec',
            autoLoadEntities: false,
            synchronize: true,            
            entities: [
                User, Comentario
            ],
          }),
        UserModule,
        AuthModule,
        ComentarioModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }