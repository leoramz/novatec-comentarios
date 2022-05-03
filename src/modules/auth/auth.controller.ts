import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ECONNREFUSED } from 'constants';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ResponseDto } from '../utils';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';
import { LocalAuthGuard } from './guards';

@ApiTags('Autorización')
@Controller('auth')
export class AuthController {    
    constructor(
        private readonly _authService: AuthService
    ) { }

    /**
     * Genera un token de acceso válido, si las credeciales de acceso son válidas.
     * @param req 
     * @returns access_token
     */
    @ApiOperation({
        summary: 'Iniciar sesión',
        description: 'Genera un token de acceso válido, si las credeciales de acceso son válidas.'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                "username": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
            }
        },
    })
    @ApiOkResponse({
        description: `Genera un access_token válido.`,
        type: ResponseDto
    })
    @ApiResponse({
        description: "ECONNREFUSED: No se pudo establecer la conexión con el servicio de destino.",
        status: ECONNREFUSED
    })
    @ApiResponse({
        description: 'Usuario o contraseña incorrecta. Por favor, intente de nuevo.',
        status: 401
    })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return await this._authService.login(req.user);
    }

    /**
     * Registra un usuario proporcionando username y contraseña.
     * @param createUserDto 
     * @returns 
     */
     @ApiOperation({
        summary: 'Registrar usuario',
        description: "Crea un nuevo usuario con el estado INACTIVO, asigna un rol por defecto y retorna el usuario creado."
    })
    @ApiBody({
        type: RegisterUserDto,
    })
    @ApiOkResponse({
        description: `Devuelve los datos del usuario creado.`,
        type: ResponseDto
    })
    @ApiResponse({
        description: "ECONNREFUSED: No se pudo establecer la conexión con el servicio de destino.",
        status: ECONNREFUSED
    })
    @ApiResponse({
        description: 'Usuario registrado. Por favor, intente de nuevo.',
        status: 201,
        type: ResponseDto
    })
    @Post('register')
    async register(
        @Body() registerUserDto: RegisterUserDto,
    ): Promise<any> {
        return await this._authService.register(registerUserDto);
    }
}