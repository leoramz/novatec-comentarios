import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UTILS_CONSTANTS } from './modules/utils';

async function bootstrap() {
    const _configService = new ConfigService;
    const NODE_ENV = _configService.get(UTILS_CONSTANTS.NODE_ENV);
    const HOST = _configService.get(UTILS_CONSTANTS.HOST);
    const PORT = _configService.get(UTILS_CONSTANTS.PORT);
    const app = await NestFactory.create(AppModule);

    //Prefijo para totas las URI
    app.setGlobalPrefix('api');

    //Habilitar los dominios cruzados
    app.enableCors();

    //Validaciones
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('Comentarios NOVATEC')
        .setDescription('API para la gestión de comentarios realizados por usuarios.')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT, HOST);

    Logger.log('Novatec Comentarios', 'NAME API');
    Logger.log(NODE_ENV, 'Ambiente');
    Logger.log(PORT, 'PORT');
    Logger.log(await app.getUrl() + '/api/', 'MAIN URI');
}
bootstrap();