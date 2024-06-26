import { Module } from '@nestjs/common';
import { MoneySourcesService } from './money-sources.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MoneySourceSchema } from '../schema/moneysource.schema';
import { MoneySourcesController } from './money-sources.controller';
import { UsersModule } from 'src/users/users.module';
import { forwardRef } from '@nestjs/common';
import { HistoryLogModule } from 'src/history-log/history-log.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MoneySource', schema: MoneySourceSchema },
    ]),
    forwardRef(() => UsersModule),
    forwardRef(() => HistoryLogModule),
  ],
  controllers: [MoneySourcesController],
  providers: [MoneySourcesService],
  exports: [MoneySourcesService],
})
export class MoneySourcesModule {}
