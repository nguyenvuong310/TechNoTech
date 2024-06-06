import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from 'src/schema/tags.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}
  async findAll(): Promise<Tag[]> {
    try {
      return this.tagModel.find().exec();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch tags',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async create(tag: Tag): Promise<Tag> {
    try {
      const newTag = new this.tagModel(tag);
      return newTag.save();
    } catch (error) {
      throw new HttpException(
        'Failed to create tag',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async update(id: string, tag: Partial<Tag>): Promise<Tag> {
    try {
      const updatedTag = await this.tagModel.findByIdAndUpdate(id, tag);
      if (!updatedTag) {
        throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
      }
      return updatedTag;
    } catch (error) {
      throw new HttpException(
        'Failed to update tag',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async delete(id: string): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const deletedTag = await this.tagModel.findByIdAndDelete(id);
      return 'Tag deleted successfully';
    } catch (error) {
      throw new HttpException(
        'Failed to delete tag',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findById(id: string): Promise<Tag> {
    try {
      const tag = await this.tagModel.findById(id);
      if (!tag) {
        throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
      }
      return tag;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch tag',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
