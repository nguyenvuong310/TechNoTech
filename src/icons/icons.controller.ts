import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { IconsService } from './icons.service';
import { Icon } from '../schema/icons.schema';
import { ApiTags, ApiBody } from '@nestjs/swagger';
@ApiTags('Icons')
@Controller('icons')
export class IconsController {
  constructor(private readonly iconService: IconsService) {}
  @Get()
  async findAllIcons(): Promise<Icon[]> {
    return this.iconService.findAll();
  }
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'icon name',
        },
        code: {
          type: 'string',
          example: 'icon code',
        },
      },
    },
  })
  async createIcon(@Body() icon: Icon): Promise<Icon> {
    return this.iconService.create(icon);
  }

  @Get(':id')
  async getIconById(@Param('id') id: string): Promise<Icon> {
    return this.iconService.getIconById(id);
  }
}
