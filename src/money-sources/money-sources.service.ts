import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MoneySource } from 'src/schema/moneysource.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import { moneySourceType } from 'src/common/enum';
import { UserService } from '../users/users.service';
import { Inject, forwardRef } from '@nestjs/common';
import { HistoryLogService } from 'src/history-log/history-log.service';
@Injectable()
export class MoneySourcesService {
  constructor(
    @InjectModel(MoneySource.name) private moneySourceModel: Model<MoneySource>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject(forwardRef(() => HistoryLogService))
    private historyLogService: HistoryLogService,
  ) {}
  async findAll(): Promise<MoneySource[]> {
    try {
      return this.moneySourceModel.find().exec();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch money sources',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async create(moneySource: MoneySource): Promise<MoneySource> {
    try {
      const newMoneySource = new this.moneySourceModel(moneySource);
      if (moneySource.type === moneySourceType.NGUONTIEN) {
        const user = await this.userService.findById(moneySource.userId);

        user.totalMoney += moneySource.Budget;
        await this.userService.update(user._id, {
          totalMoney: user.totalMoney,
        });
      }
      return newMoneySource.save();
    } catch (error) {
      throw new HttpException(
        'Failed to create money source',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async update(
    id: string,
    moneySource: Partial<MoneySource>,
  ): Promise<MoneySource> {
    try {
      const oldMoneySource = await this.moneySourceModel.findById(id);
      if (moneySource.type === moneySourceType.NGUONTIEN) {
        const user = await this.userService.findById(moneySource.userId);
        user.totalMoney += moneySource.Budget - oldMoneySource.Budget;
        await this.userService.update(user._id, {
          totalMoney: user.totalMoney,
        });
      }
      const updatedMoneySource = await this.moneySourceModel.findByIdAndUpdate(
        id,
        moneySource,
        { new: true },
      );
      return updatedMoneySource;
    } catch (error) {
      throw new HttpException(
        'Failed to update money source',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async delete(id: string): Promise<string> {
    try {
      const moneysource = await this.moneySourceModel.findByIdAndDelete(id);
      if (moneysource.type === moneySourceType.NGUONTIEN) {
        const user = await this.userService.findById(moneysource.userId);
        user.totalMoney -= moneysource.Budget;
        await this.userService.update(user._id, {
          totalMoney: user.totalMoney,
        });
      }
      return 'Money Source deleted successfully';
    } catch (error) {
      throw new HttpException(
        'Failed to delete money source',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getDetailById(userid: string, moneySourceId: string): Promise<any> {
    try {
      const moneySource = await this.moneySourceModel
        .findOne({ _id: moneySourceId, userId: userid })
        .exec();

      if (!moneySource) {
        throw new HttpException('Money source not found', HttpStatus.NOT_FOUND);
      }
      const data =
        await this.historyLogService.findLogByMoneySourceId(moneySourceId);
      return { moneySource: moneySource, logs: data };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to find money source',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getMoneySourceByType(userId: string): Promise<any> {
    try {
      const moneySources = await this.moneySourceModel.find({ userId });
      const nguonTien = moneySources.filter(
        (moneySource) => moneySource.type === moneySourceType.NGUONTIEN,
      );
      const khoanno = moneySources.filter(
        (moneySource) => moneySource.type === moneySourceType.KHOANNO,
      );
      const tietkiem = moneySources.filter(
        (moneySource) => moneySource.type === moneySourceType.TIETKIEM,
      );
      return { moneySources: nguonTien, debts: khoanno, savings: tietkiem };
    } catch (error) {
      throw new HttpException(
        'Failed to get money source by type',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findById(id: string): Promise<MoneySource> {
    try {
      return this.moneySourceModel.findById(id).exec();
    } catch (error) {
      throw new HttpException(
        'Failed to find money source',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
