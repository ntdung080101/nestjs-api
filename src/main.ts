import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';

import { HttpExceptionFilter } from './filters/http-exception.filter';
import { HttpModule } from './http.module';
import { loadConfiguration } from './utils/load-configuration';
const config = new ConfigService(loadConfiguration());

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageMeta = require(resolve('package.json'));

const PACKAGE = packageMeta.name;
const VERSION = packageMeta.version;
const LOG_LEVEL = config.get('log.level', [
  'log',
  'error',
  'warn',
] as LogLevel[]);
const SERVER_PORT = config.getOrThrow('server.port');
const DOC_VERSION = config.getOrThrow('swagger.version');

async function bootstrap(port: number = 3000) {
  const app = await NestFactory.create(HttpModule);

  const config = new DocumentBuilder()
    .setTitle(PACKAGE)
    .setDescription(`Api document for ${PACKAGE}`)
    .setVersion(DOC_VERSION)
    .addBearerAuth(
      {
        description: 'Default JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs-api', app, document);

  app.useLogger(LOG_LEVEL);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();
  await app.listen(port);
}
bootstrap(SERVER_PORT).then(async () => {
  Logger.log(`${PACKAGE}@${VERSION} started on port ${SERVER_PORT}`);
});
