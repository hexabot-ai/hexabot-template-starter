import { Controller, Get } from '@nestjs/common';
import { Roles } from '@hexabot-ai/api';

@Controller('hello')
export class HelloController {
  @Get()
  @Roles('public')
  check() {
    return { data: 'Hello World!'};
  }
}
