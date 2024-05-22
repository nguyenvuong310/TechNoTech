import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { MoneySourcesService } from './money-sources.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { MoneySource } from '../schema/moneysource.schema';
@ApiTags('Money-Sources')
@Controller('money-sources')
export class MoneySourcesController {
  constructor(private readonly sourceService: MoneySourcesService) {}

  @Get()
  async getMoneySources() {
    try {
      return this.sourceService.findAll();
    } catch (error) {
      return error;
    }
  }

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Bank Account',
        },
        balance: {
          type: 'number',
          example: 1000,
        },
        currency: {
          type: 'string',
          example: 'USD',
        },
      },
    },
  })
  async createMoneySource(@Body() source: MoneySource) {
    try {
      return this.sourceService.create(source);
    } catch (error) {
      return error;
    }
  }

  @Patch()
  async updateMoneySource(
    @Query('id') id: string,
    @Body() source: Partial<MoneySource>,
  ) {
    try {
      return this.sourceService.update(id, source);
    } catch (error) {
      return error;
    }
  }

  @Delete()
  async deleteMoneySource(@Query('id') id: string) {
    try {
      return this.sourceService.delete(id);
    } catch (error) {
      return error;
    }
  }
}
