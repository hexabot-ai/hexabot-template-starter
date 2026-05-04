import { Roles } from '@hexabot-ai/api';
import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get()
  @Roles('public')
  check() {
    return { data: 'Hello World!' };
  }
}
