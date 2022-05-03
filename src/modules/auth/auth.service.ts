import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { verifyPW } from '../utils';

@Injectable()
export class AuthService {
    constructor(
        private readonly _userService: UserService,
        private readonly _jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        try {
            const user = await this._userService.getUserByUsername(username);
            
            if (!user) {
                Logger.log('validateUserError', 'AuthService');
                return null;
            }
            
            if (await verifyPW(password, user?.password)) {
                Logger.log('validateUser', 'AuthService');
                return user;
            }

            Logger.error('validateUserError', 'AuthService');
            return null;
        } catch (e) {
            Logger.log(e, 'ErrorValidateUser');
            throw e.error;
        }
    }

    async login(user) {
        user.password = undefined;
        const payload = { user, sub: user.id };

        Logger.log('login', 'AuthService');
        return {
            error: false,
            msg: 'Sesión iniciada correctamente.',
            data: {
                user_id: user.id,
                access_token: await this._jwtService.sign(payload)
            }
        };
    }

    async register(registerUserDto: CreateUserDto): Promise<any> {
        return await this._userService.createUser(registerUserDto);
    }
}