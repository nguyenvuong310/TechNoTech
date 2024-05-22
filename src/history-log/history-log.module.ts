import { Module } from '@nestjs/common';
import { HistoryLogService } from './history-log.service';
import { MongooseModule } from '@nestjs/mongoose';
import { logSchema } from '../schema/logs.schema';
import { HistoryLogController } from './history-log.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'HistoryLog', schema: logSchema }]),
  ],
  controllers: [HistoryLogController],
  providers: [HistoryLogService],
})
export class HistoryLogModule {}
