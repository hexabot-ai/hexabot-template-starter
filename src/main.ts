import 'dotenv/config';
import { bootstrapHexabotApp } from '@hexabot-ai/api';

import { AppModule } from './app.module';

async function bootstrap() {
  await bootstrapHexabotApp(AppModule, {
    listen: {
      port: Number.parseInt(`${process.env.PORT ?? ''}`, 10) || 3000,
    },
  });
}

bootstrap();
