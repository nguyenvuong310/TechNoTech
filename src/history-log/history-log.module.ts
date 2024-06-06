import { Module } from '@nestjs/common';
import { HistoryLogService } from './history-log.service';
import { MongooseModule } from '@nestjs/mongoose';
import { logSchema } from '../schema/logs.schema';
import { TagsSchema } from '../schema/tags.schema';
import { HistoryLogController } from './history-log.controller';
import { MoneySourcesModule } from 'src/money-sources/money-sources.module';
import { TagsModule } from 'src/tags/tags.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'HistoryLog', schema: logSchema },
      { name: 'Tag', schema: TagsSchema },
    ]),
    MoneySourcesModule,
    TagsModule,
  ],
  controllers: [HistoryLogController],
  providers: [HistoryLogService],
  exports: [HistoryLogService],
})
export class HistoryLogModule {}
