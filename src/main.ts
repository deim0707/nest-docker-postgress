import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// точка входа в приложение

async function startApp() {
  const PORT = process.env.PORT || 5007;
  // экземпляр приложения
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () =>
    console.log('is server started on port: ', PORT),
  );
}

startApp();
// https://www.youtube.com/watch?v=dDeWWQWMM-Y
