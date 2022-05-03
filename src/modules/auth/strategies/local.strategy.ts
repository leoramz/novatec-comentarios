import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly _authService: AuthService
    ) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this._authService.validateUser(username, password);
        
        if (!user) {
            throw new UnauthorizedException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Usuario o contraseña incorrecta. Por favor, intente de nuevo.'
            });
        }

        return user;
    }
}