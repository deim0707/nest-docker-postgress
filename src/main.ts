import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// точка входа в приложение
async function startApp() {
  const PORT = process.env.PORT;
  // экземпляр приложения
  const app = await NestFactory.create(AppModule);

  const configSwagger = new DocumentBuilder()
    .setTitle('NestDockerPostgres') // название приложения
    .setDescription('NestDockerPostgres123') // описание приложения
    .setVersion('1.0.0') // версия приложения
    .addTag('nest')
    .build();

  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/api/swagger', app, documentSwagger);

  // так мы можем использовать гвард (предоставлять что-то только авторизированным пользователям) глобально по приложению
  // app.useGlobalGuards(JwtAuthGuard);

  await app.listen(PORT, () =>
    console.log('is server started on port: ', PORT),
  );
}

startApp();
// https://youtu.be/dDeWWQWMM-Y?t=3965

// nest CLI
// nest generate module NAME
// nest generate controller NAME
// nest generate service NAME
