import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UTILS_CONSTANTS } from '../utils';
import { JwtStrategy, LocalStrategy } from './strategies';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get(UTILS_CONSTANTS.JWT_SECRET),
                signOptions: {
                    expiresIn: config.get(UTILS_CONSTANTS.JWT_TIME_LOGIN)
                }
            })
        }),
        UserModule
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy
    ],
    controllers: [AuthController]
})
export class AuthModule { }