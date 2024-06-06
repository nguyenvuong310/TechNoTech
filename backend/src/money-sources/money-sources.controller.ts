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
import { ApiTags, ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { MoneySource } from '../schema/moneysource.schema';
@ApiTags('Money-Sources')
@Controller('moneySources')
export class MoneySourcesController {
  constructor(private readonly sourceService: MoneySourcesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all money sources' })
  async getMoneySources() {
    try {
      return this.sourceService.findAll();
    } catch (error) {
      return error;
    }
  }
  @Get('detail')
  @ApiOperation({ summary: 'Get money source by user id' })
  @ApiQuery({
    name: 'userId',
    required: true,
    schema: {
      type: 'string',
      example: '665dcbf114bc7da8c41eddf3',
    },
  })
  @ApiQuery({
    name: 'moneySourceId',
    required: true,
    schema: {
      type: 'string',
      example: '665dcc9f14bc7da8c41eddf7',
    },
  })
  async getMoneySourcesByUserId(
    @Query('userId') userId: string,
    @Query('moneySourceId') moneySourceId: string,
  ) {
    try {
      return this.sourceService.getDetailById(userId, moneySourceId);
    } catch (error) {
      return error;
    }
  }
  @Post()
  @ApiOperation({ summary: 'Create a new money source' })
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
          example: '665ae38be84bdba25c3c1c26',
        },
        // currentMoney: {
        //   type: 'number',
        //   example: 5000,
        // },
        // expectedMoney: {
        //   type: 'number',
        //   example: 6000,
        // },
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
          example: '665dcbf114bc7da8c41eddf3',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2023-06-11T15:00:00Z',
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
          example: '665ae38be84bdba25c3c1c26',
        },
        // currentMoney: {
        //   type: 'number',
        //   example: 5000,
        // },
        // expectedMoney: {
        //   type: 'number',
        //   example: 6000,
        // },
        Budget: {
          type: 'number',
          example: 5600,
        },
        type: {
          type: 'string',
          example: 'nguontien', // Adjust if moneySourceType is an enum
        },
        userId: {
          type: 'string',
          format: 'ObjectId',
          example: '665dcbf114bc7da8c41eddf3',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2023-06-11T15:00:00Z',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Update a money source' })
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
  @ApiOperation({ summary: 'Delete a money source' })
  @ApiQuery({
    name: 'id',
    required: true,
    schema: {
      type: 'string',
      example: '665dcc9f14bc7da8c41eddf8',
    },
  })
  @Delete()
  async deleteMoneySource(@Query('id') id: string) {
    try {
      return this.sourceService.delete(id);
    } catch (error) {
      return error;
    }
  }

  @Get('byType')
  @ApiOperation({ summary: 'Get money sources by type' })
  @ApiQuery({
    name: 'userId',
    required: true,
    schema: {
      type: 'string',
      example: '665dcbf114bc7da8c41eddf3',
    },
  })
  async getMoneySourcesByType(@Query('userId') userId: string) {
    try {
      return this.sourceService.getMoneySourceByType(userId);
    } catch (error) {
      return error;
    }
  }
  // @Get()
  // async findById(@Query('id') id: string) {
  //   try {
  //     return this.sourceService.findById(id);
  //   } catch (error) {
  //     return error;
  //   }
  // }
}
