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
        userId: {
          type: 'string',
          example: 'xxxx-xxxx-xxxx-xxxx',
        },
        action: {
          type: 'string',
          example: 'created',
        },
        description: {
          type: 'string',
          example: 'User created by admin',
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
}
