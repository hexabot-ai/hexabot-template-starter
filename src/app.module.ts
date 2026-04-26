import { HexabotModule } from '@hexabot-ai/api';

import { HelloController } from './hello.controller';

@HexabotModule({
  controllers: [HelloController],
})
export class AppModule {}
