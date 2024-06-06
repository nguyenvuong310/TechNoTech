import { Module } from '@nestjs/common';
import { IconsController } from './icons.controller';
import { IconsService } from './icons.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IconsSchema } from '../schema/icons.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Icon', schema: IconsSchema }])],
  controllers: [IconsController],
  providers: [IconsService],
  exports: [MongooseModule],
})
export class IconsModule {}
