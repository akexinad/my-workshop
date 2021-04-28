import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    getWtf(): string {
        return 'what the fuck is going on';
    }
}
