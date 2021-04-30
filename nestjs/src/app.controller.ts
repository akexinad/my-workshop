import { Controller, Get, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller('foo')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/wtf')
    @HttpCode(876)
    getFoo() {
        // return this.appService.getWtf();
        const data = this.appService.getWtf();

        return data;

        // res.status(700).send(data);
    }
}
