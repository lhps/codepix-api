import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {PixKeyGrpcUnknownErrorFilter} from "./pix-keys/filters/pix-key-grpc-unknow-error.filter";
import {PixKeyAlreadyExistsErrorFilter} from "./pix-keys/filters/pix-key-already-exists.error";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new PixKeyGrpcUnknownErrorFilter(), new PixKeyAlreadyExistsErrorFilter());

  await app.listen(3000);
}
bootstrap();
