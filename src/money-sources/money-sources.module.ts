import { Module } from '@nestjs/common';
import { MoneySourcesService } from './money-sources.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MoneySourceSchema } from '../schema/moneysource.schema';
import { MoneySourcesController } from './money-sources.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MoneySource', schema: MoneySourceSchema },
    ]),
  ],
  controllers: [MoneySourcesController],
  providers: [MoneySourcesService],
})
export class MoneySourcesModule {}
