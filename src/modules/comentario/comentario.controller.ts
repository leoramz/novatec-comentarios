import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ECONNREFUSED } from 'constants';
import { JwtAuthGuard } from '../auth/guards';
import { ResponseDto } from '../utils';
import { ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { Comentario } from './entity/comentario.entity';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Comentarios')
@Controller('comments')
export class ComentarioController {
    constructor(
        private readonly _comentarioService: ComentarioService
    ) {}

    /**
     * Crea un comentario
     * @param comentario 
     * @returns 
     */
     @ApiOperation({
        summary: 'Crear comentario',
    })
    @ApiBody({
        type: CreateComentarioDto
    })
    @ApiOkResponse({
        description: 'Retorna el comentario creado.',
        type: ResponseDto
    })
    @ApiResponse({
        description: "ECONNREFUSED: No se pudo establecer la conexión con el servicio de destino.",
        status: ECONNREFUSED
    })
    @Post('create')
    async createComentario(
        @Body()
        comentario: CreateComentarioDto
    ): Promise<any> {
        return await this._comentarioService.createComentario(comentario);
    }

    /**
     * Trae todos los comentarios.
     * @returns 
     */
    @ApiOperation({
        summary: 'Devuelve todos los usaurios',
        description: "Retorna todos los comentarios."
    })
    @ApiOkResponse({
        description: `Devuelve un array de comentarios.`,
        type: [Comentario]
    })
    @ApiResponse({
        description: "ECONNREFUSED: No se pudo establecer la conexión con el servicio de destino.",
        status: ECONNREFUSED
    })
    @ApiResponse({
        description: 'Array de comentarios vacíos []',
        status: 201
    })
    @Get('all')
    async getAllComentarios(): Promise<any> {
        return await this._comentarioService.getAllComentarios();
    }

    /**
     * Devuelve un comentario activo.
     * @param id 
     * @returns 
     */
    @ApiOperation({
        summary: 'Devuelve un comentario',
        description: "Retorna un comentario con el ID suministrado."
    })
    @ApiParam({ 
        name: 'id', 
        required: true 
    })
    @ApiOkResponse({
        description: `Retorna un comentario.`,
        type: Comentario
    })
    @ApiResponse({
        description: "ECONNREFUSED: No se pudo establecer la conexión con el servicio de destino.",
        status: ECONNREFUSED
    })
    @ApiResponse({
        description: 'Comentario with ID (${id}) does not exist.',
        status: 201
    })
    @Get('get/:id')
    async getComentarioById(
        @Param('id')
        id: string
    ): Promise<any> {
        return this._comentarioService.getComentarioById(id);
    }

    /**
     * Actualizar comentario según el ID.
     * @param id 
     * @param createComentarioDto 
     * @returns 
     */
    @ApiOperation({
        summary: 'Actualizar datos de un comentario.',
        description: "Retorna el comentario actualizado con el ID suministrado."
    })
    @ApiParam({ 
        name: 'id', 
        required: true 
    })
    @ApiBody({
        type: CreateComentarioDto
    })
    @ApiOkResponse({
        description: `Retorna un comentario actualizado.`,
        type: Comentario
    })
    @ApiResponse({
        description: "ECONNREFUSED: No se pudo establecer la conexión con el servicio de destino.",
        status: ECONNREFUSED
    })
    @ApiResponse({
        description: 'ID must be sent.',
        status: 201
    })
    @ApiResponse({
        description: 'Comentario with ID (${id}) does not exist.',
        status: 201
    })
    @Put('update/:id')
    async updateComentario(
        @Param('id')
        id: string,
        @Body()
        createComentarioDto: Partial<CreateComentarioDto>
    ): Promise<any> {
        return this._comentarioService.updateComentario(id, createComentarioDto);
    }

    /**
     * Elimina un comentario según el ID suministrado.
     * @param id 
     * @returns 
     */
    @ApiOperation({
        summary: 'Elimina un comentario',
        description: "Elimina un comentario según el ID suministrado."
    })
    @ApiParam({ 
        name: 'id', 
        required: true 
    })
    @ApiOkResponse({
        description: `Retorna el comentario eliminado.`,
        type: Comentario
    })
    @ApiResponse({
        description: "ECONNREFUSED: No se pudo establecer la conexión con el servicio de destino.",
        status: ECONNREFUSED
    })
    @ApiResponse({
        description: 'ID must be sent.',
        status: 201
    })
    @ApiResponse({
        description: 'Comentario with ID (${id}) does not exist.',
        status: 201
    })
    @Delete('delete/:id')
    async deleteComentario(
        @Param('id')
        id: string
    ): Promise<any> {
        return await this._comentarioService.deleteComentario(id);
    }
}