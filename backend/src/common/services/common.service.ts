import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  async getSettings(header): Promise<any> {
    return {};
  }
}
