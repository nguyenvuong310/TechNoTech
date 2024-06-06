import { Controller, Query } from '@nestjs/common';
import { HistoryLogService } from './history-log.service';
import { ApiTags, ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Get, Post, Delete, Body } from '@nestjs/common';
import { HistoryLog } from 'src/schema/logs.schema';

@ApiTags('History Log')
@Controller('historyLog')
export class HistoryLogController {
  constructor(private readonly logService: HistoryLogService) {}
  @Get()
  @ApiOperation({ summary: 'Get all logs' })
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
          example: 'thu',
        },
        MoneySourceId: {
          type: 'string',
          example: '665dcc9f14bc7da8c41eddf7',
        },
        // MoneyDestId: {
        //   type: 'string',
        //   example: '',
        // },
        moneyValue: {
          type: 'number',
          example: 100000,
        },
        TagId: {
          type: 'string',
          example: '665ae38be84bdba25c3c1c26',
        },
        userId: {
          type: 'string',
          example: '665dcbf114bc7da8c41eddf3',
        },
        createdAt: {
          type: 'string',
          example: '2021-06-11T07:00:00.000Z',
        },
        description: {
          type: 'string',
          example: 'mua do',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Create a new log' })
  async createLog(@Body() log: HistoryLog) {
    try {
      return this.logService.create(log);
    } catch (error) {
      return error;
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a log' })
  async deleteLog(@Query('id') id: string) {
    try {
      return this.logService.delete(id);
    } catch (error) {
      return error;
    }
  }

  // @Get('total-money-month-by-type')
  // @ApiOperation({ summary: 'Calculate total money in month' })
  // @ApiQuery({
  //   name: 'month',
  //   required: true,
  //   schema: {
  //     type: 'number',
  //     example: 6,
  //   },
  // })
  // @ApiQuery({
  //   name: 'year',
  //   required: true,
  //   schema: {
  //     type: 'number',
  //     example: 2024,
  //   },
  // })
  // @ApiQuery({
  //   name: 'type',
  //   required: true,
  //   schema: {
  //     type: 'string',
  //     example: 'thu',
  //   },
  // })
  // async calcTotalMoneyMonth(
  //   @Query('month') month: number,
  //   @Query('year') year: number,
  //   @Query('type') type: string,
  // ) {
  //   try {
  //     return this.logService.calcTotalMoneyMonth(month, year, type);
  //   } catch (error) {
  //     return error;
  //   }
  // }

  @Get('data-for-chart')
  @ApiOperation({ summary: 'Get data for chart' })
  @ApiQuery({
    name: 'month',
    required: true,
    schema: {
      type: 'number',
      example: 6,
    },
  })
  @ApiQuery({
    name: 'year',
    required: true,
    schema: {
      type: 'number',
      example: 2024,
    },
  })
  @ApiQuery({
    name: 'type',
    required: true,
    schema: {
      type: 'string',
      example: 'thu',
    },
  })
  @ApiQuery({
    name: 'userId',
    required: true,
    schema: {
      type: 'string',
      example: '665dcbf114bc7da8c41eddf3',
    },
  })
  async getDataForChart(
    @Query('month') month: number,
    @Query('year') year: number,
    @Query('type') type: string,
    @Query('userId') userId: string,
  ) {
    try {
      return this.logService.moneyInMonth(month, year, type, userId);
    } catch (error) {
      return error;
    }
  }
  @Get('by-month')
  @ApiOperation({ summary: 'Get log by month' })
  @ApiQuery({
    name: 'month',
    required: true,
    schema: {
      type: 'number',
      example: 6,
    },
  })
  @ApiQuery({
    name: 'year',
    required: true,
    schema: {
      type: 'number',
      example: 2024,
    },
  })
  @ApiQuery({
    name: 'userId',
    required: true,
    schema: {
      type: 'string',
      example: '665dcbf114bc7da8c41eddf3',
    },
  })
  async getLogByMonth(
    @Query('month') month: number,
    @Query('year') year: number,
    @Query('userId') userId: string,
  ) {
    try {
      return this.logService.getLogByMonth(month, year, userId);
    } catch (error) {
      return error;
    }
  }
  @Get('by-user-id')
  async getLogByUserId(@Query('userId') userId: string) {
    try {
      return this.logService.getAllLogByUserId(userId);
    } catch (error) {
      return error;
    }
  }
}
