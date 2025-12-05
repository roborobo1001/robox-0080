import { Controller } from '@nestjs/common';
import { apiContract } from '@repo/contracts';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { HelloService } from './hello.service';

@Controller()
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @TsRestHandler(apiContract.hello)
  async handler() {
    return tsRestHandler(apiContract.hello, {
      getHello: async () => {
        const helloDto = await this.helloService.getHello();
        return {
          status: 200,
          body: helloDto,
        };
      },
    });
  }
}
