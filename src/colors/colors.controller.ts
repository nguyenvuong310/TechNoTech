import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { Color } from '../schema/colors.schema';
import { ApiTags, ApiBody } from '@nestjs/swagger';
@ApiTags('Colors')
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}
  @Get()
  async findAllColors(): Promise<Color[]> {
    return this.colorsService.findAll();
  }
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          example: '#FF0000',
        },
      },
    },
  })
  async createColor(@Body() color: Color): Promise<Color> {
    try {
      return this.colorsService.create(color);
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async getColorById(@Param('id') id: string): Promise<Color> {
    return this.colorsService.getColorById(id);
  }
}
