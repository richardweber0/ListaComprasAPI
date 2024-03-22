import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'TESTE!';
  }

  getObject(): any {
    let objeto = {
      id: 1,
      nome: "Richard"
    }
    return objeto;
  }
}
