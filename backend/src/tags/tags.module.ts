import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TagsSchema } from '../schema/tags.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tag', schema: TagsSchema }])],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
