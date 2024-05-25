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
          example: 'Salary',
        },
        TagId: {
          type: 'string',
          format: 'ObjectId',
          example: '60c72b2f5f1b2c001c8e4d60',
        },
        currentMoney: {
          type: 'number',
          example: 5000,
        },
        expectedMoney: {
          type: 'number',
          example: 6000,
        },
        Budget: {
          type: 'number',
          example: 5500,
        },
        type: {
          type: 'string',
          example: 'nguontien', // Adjust if moneySourceType is an enum
        },
        userId: {
          type: 'string',
          format: 'ObjectId',
          example: '6651eb9b3a1ab1bee7e0ec99',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2023-05-25T15:00:00Z',
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Salary',
        },
        TagId: {
          type: 'string',
          format: 'ObjectId',
          example: '60c72b2f5f1b2c001c8e4d60',
        },
        currentMoney: {
          type: 'number',
          example: 5000,
        },
        expectedMoney: {
          type: 'number',
          example: 6000,
        },
        Budget: {
          type: 'number',
          example: 5500,
        },
        type: {
          type: 'string',
          example: 'nguontien',
        },
        userId: {
          type: 'string',
          format: 'ObjectId',
          example: '6651eb9b3a1ab1bee7e0ec99',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2023-05-25T15:00:00Z',
        },
      },
    },
  })
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
