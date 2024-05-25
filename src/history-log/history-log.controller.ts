import { Controller, Query } from '@nestjs/common';
import { HistoryLogService } from './history-log.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Get, Post, Delete, Body } from '@nestjs/common';
import { HistoryLog } from 'src/schema/logs.schema';
@ApiTags('History Log')
@Controller('history-log')
export class HistoryLogController {
  constructor(private readonly logService: HistoryLogService) {}
  @Get()
  async findAllLogs() {
    try {
      return this.logService.findAll();
    } catch (error) {
      return error;
    }
  }
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          example: 'chuyen',
        },
        MoneySourceId: {
          type: 'string',
          example: '664db8206095db73ea986f37',
        },
        MoneyDestId: {
          type: 'string',
          example: '664db8206095db73ea986f37',
        },
        moneyValue: {
          type: 'number',
          example: 100000,
        },
        TagId: {
          type: 'string',
          example: '664db8206095db73ea986f37',
        },
        userId: {
          type: 'string',
          example: '664db8206095db73ea986f37',
        },
      },
    },
  })
  async createLog(@Body() log: HistoryLog) {
    try {
      return this.logService.create(log);
    } catch (error) {
      return error;
    }
  }
  @Delete()
  async deleteLog(@Query('id') id: string) {
    try {
      return this.logService.delete(id);
    } catch (error) {
      return error;
    }
  }
  @Get('total-money-month-by-type')
  async calcTotalMoneyMonth(
    @Query('month') month: number,
    @Query('year') year: number,
    @Query('type') type: string,
  ) {
    try {
      return this.logService.calcTotalMoneyMonth(month, year, type);
    } catch (error) {
      return error;
    }
  }
}
