import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ColorSchema } from 'src/schema/colors.schema';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Color', schema: ColorSchema }]),
  ],
  controllers: [ColorsController],
  providers: [ColorsService],
})
export class ColorsModule {}
