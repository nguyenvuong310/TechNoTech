import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistoryLog } from 'src/schema/logs.schema';
import { logType } from 'src/common/enum';
import { MoneySourcesService } from 'src/money-sources/money-sources.service';
@Injectable()
export class HistoryLogService {
  constructor(
    @InjectModel(HistoryLog.name) private historyLogModel: Model<HistoryLog>,
    private moneySourceService: MoneySourcesService,
  ) {}
  async findAll(): Promise<HistoryLog[]> {
    return this.historyLogModel.find().exec();
  }
  async create(historyLog: HistoryLog): Promise<HistoryLog> {
    const newHistoryLog = new this.historyLogModel(historyLog);
    if (historyLog.type === logType.CHUYEN) {
      const moneySource = await this.moneySourceService.findById(
        historyLog.MoneySourceId,
      );
      const moneySourceDes = await this.moneySourceService.findById(
        historyLog.MoneyDestId,
      );
      moneySource.Budget -= historyLog.moneyValue;
      moneySourceDes.Budget += historyLog.moneyValue;
      await this.moneySourceService.update(moneySource._id, {
        Budget: moneySource.Budget,
      });
      await this.moneySourceService.update(moneySourceDes._id, {
        Budget: moneySourceDes.Budget,
      });
    } else {
      const moneySource = await this.moneySourceService.findById(
        historyLog.MoneySourceId,
      );
      if (historyLog.type === logType.CHI) {
        moneySource.Budget -= historyLog.moneyValue;
      } else {
        moneySource.Budget += historyLog.moneyValue;
      }
      await this.moneySourceService.update(moneySource._id, {
        Budget: moneySource.Budget,
      });
    }
    return newHistoryLog.save();
  }
  async delete(id: string): Promise<string> {
    await this.historyLogModel.findByIdAndDelete(id);
    return 'History Log deleted successfully';
  }
  async calcTotalMoneyMonth(
    month: number,
    year: number,
    type: string,
  ): Promise<number> {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);

    const logs = await this.historyLogModel
      .find({
        createdAt: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
        type: type,
      })
      .exec();

    let totalMoney = 0;
    logs.forEach((log) => {
      totalMoney += log.moneyValue;
    });

    return totalMoney;
  }
}
