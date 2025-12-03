import { Body, Controller, Param, Post } from "@nestjs/common";

@Controller('pay')
export class PayController {
  constructor() { }

  @Post('pay/:id')
  pay(@Param('id') id: string, @Body() body: any) {
    throw new Error('Method not implemented.');
  }
}