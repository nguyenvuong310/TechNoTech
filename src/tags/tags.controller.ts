import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from '../schema/tags.schema';
import { ApiTags, ApiBody } from '@nestjs/swagger';
@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Get()
  async findAllTags(): Promise<Tag[]> {
    try {
      return this.tagsService.findAll();
    } catch (error) {
      return error;
    }
  }
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        iconId: {
          type: 'string',
          example: '664db8206095db73ea986f37',
        },
        colorId: {
          type: 'string',
          example: '664db8206095db73ea986f37',
        },
        name: {
          type: 'string',
          example: 'John Doe',
        },
        // type: {
        //   type: 'string',
        //   example: 'admin',
        // },
        userId: {
          type: 'string',
          example: '664db8206095db73ea986f37',
        },
      },
    },
  })
  async createTag(@Body() tag: Tag): Promise<Tag> {
    try {
      return this.tagsService.create(tag);
    } catch (error) {
      return error;
    }
  }
  @Patch()
  async updateTag(
    @Query('id') id: string,
    @Body() tag: Partial<Tag>,
  ): Promise<Tag> {
    try {
      return this.tagsService.update(id, tag);
    } catch (error) {
      return error;
    }
  }
  @Delete()
  async deleteTag(@Query('id') id: string): Promise<string> {
    try {
      return this.tagsService.delete(id);
    } catch (error) {
      return error;
    }
  }
}
