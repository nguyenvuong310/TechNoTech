import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from '../schema/tags.schema';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Get()
  @ApiOperation({ summary: 'Get all tags' })
  async findAllTags(): Promise<Tag[]> {
    try {
      return this.tagsService.findAll();
    } catch (error) {
      return error;
    }
  }
  @Post()
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        iconId: {
          type: 'string',
          example: '665ad4df7252665498fc180a',
        },
        colorId: {
          type: 'string',
          example: '664db8206095db73ea986f37',
        },
        name: {
          type: 'string',
          example: 'shopping',
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
  @ApiOperation({ summary: 'Update a tag' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        iconId: {
          type: 'string',
          example: '665ad4df7252665498fc180a',
        },
        colorId: {
          type: 'string',
          example: '664db8206095db73ea986f37',
        },
        name: {
          type: 'string',
          example: 'gaming',
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
  @ApiOperation({ summary: 'Delete a tag' })
  async deleteTag(@Query('id') id: string): Promise<string> {
    try {
      return this.tagsService.delete(id);
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tag by id' })
  async findTagById(@Param('id') id: string): Promise<Tag> {
    try {
      return this.tagsService.findById(id);
    } catch (error) {
      return error;
    }
  }
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all tags by userId' })
  async getAllTagByUserId(@Param('userId') userId: string): Promise<Tag[]> {
    try {
      return this.tagsService.getAllTagByUserId(userId);
    } catch (error) {
      return error;
    }
  }
}
