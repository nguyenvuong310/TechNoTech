import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistoryLog } from 'src/schema/logs.schema';
@Injectable()
export class HistoryLogService {
  constructor(
    @InjectModel(HistoryLog.name) private historyLogModel: Model<HistoryLog>,
  ) {}
  async findAll(): Promise<HistoryLog[]> {
    return this.historyLogModel.find().exec();
  }
  async create(historyLog: HistoryLog): Promise<HistoryLog> {
    const newHistoryLog = new this.historyLogModel(historyLog);
    // if (historyLog.type === 'thu'){

    // }
    // else if (historyLog.type === 'chi'){

    // }
    // else{

    // }
    return newHistoryLog.save();
  }
  async delete(id: string): Promise<string> {
    await this.historyLogModel.findByIdAndDelete(id);
    return 'History Log deleted successfully';
  }
}
