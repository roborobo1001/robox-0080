import { Injectable } from '@nestjs/common';
import type { HelloDto } from '@repo/data';

@Injectable()
export class HelloService {
  async getHello(): Promise<HelloDto> {
    await new Promise((resolve) => setTimeout(resolve, 50));

    return {
      message: `Hello world!!!`,
    };
  }
}
