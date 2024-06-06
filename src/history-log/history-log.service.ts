import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistoryLog } from 'src/schema/logs.schema';
import { logType } from 'src/common/enum';
import { MoneySourcesService } from 'src/money-sources/money-sources.service';
import { TagsService } from 'src/tags/tags.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Tag } from 'src/schema/tags.schema';
import { Icon } from 'src/schema/icons.schema';
import { Color } from 'src/schema/colors.schema';

@Injectable()
export class HistoryLogService {
  constructor(
    @InjectModel(HistoryLog.name) private historyLogModel: Model<HistoryLog>,
    private moneySourceService: MoneySourcesService,
    private tagService: TagsService,
    @InjectModel(Tag.name) private readonly tagModel: Model<Tag>,
    @InjectModel(Icon.name) private readonly iconModel: Model<Icon>,
    @InjectModel(Color.name) private readonly colorModel: Model<Color>,
  ) {}
  async findAll(): Promise<HistoryLog[]> {
    return this.historyLogModel.find().exec();
  }
  async create(historyLog: HistoryLog): Promise<HistoryLog> {
    try {
      const newHistoryLog = new this.historyLogModel(historyLog);
      if (historyLog.type === logType.CHUYEN) {
        const moneySource = await this.moneySourceService.findById(
          historyLog.MoneySourceId,
        );
        moneySource.Budget -= historyLog.moneyValue;
        await this.moneySourceService.update(moneySource._id, moneySource);
        if (historyLog.MoneyDestId) {
          const moneySourceDes = await this.moneySourceService.findById(
            historyLog.MoneyDestId,
          );
          moneySourceDes.Budget += historyLog.moneyValue;
          await this.moneySourceService.update(moneySourceDes._id, moneySource);
        }
      } else {
        const moneySource = await this.moneySourceService.findById(
          historyLog.MoneySourceId,
        );
        if (historyLog.type === logType.CHI) {
          moneySource.Budget -= historyLog.moneyValue;
        } else {
          console.log('moneySource', moneySource);
          moneySource.Budget += historyLog.moneyValue;
        }
        await this.moneySourceService.update(moneySource._id, moneySource);
      }
      return newHistoryLog.save();
    } catch (error) {
      console.error('Error creating history log:', error);
      throw new HttpException(
        'Failed to update money source',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
  async moneyInMonth(
    month: number,
    year: number,
    type: string,
    userId: string,
  ): Promise<number[]> {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
    console.log(month, year, type, userId);
    let objectIdUserId: any;
    try {
      if (mongoose.Types.ObjectId.isValid(userId)) {
        objectIdUserId = new mongoose.Types.ObjectId(userId);
      } else {
        throw new Error('Invalid userId format');
      }
    } catch (error) {
      console.error('Error converting userId to ObjectId:', error);
      return [];
    }
    const logs = await this.historyLogModel
      .find({
        userId: objectIdUserId,
        createdAt: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
        type: type,
      })
      .exec();
    const listNumber: number[] = [];
    logs.forEach((log) => {
      listNumber.push(log.moneyValue);
    });
    return listNumber;
  }
  async getLogByMonth(
    month: number,
    year: number,
    userId: string,
  ): Promise<any[]> {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
    let objectIdUserId: any;
    try {
      if (mongoose.Types.ObjectId.isValid(userId)) {
        objectIdUserId = new mongoose.Types.ObjectId(userId);
      } else {
        throw new Error('Invalid userId format');
      }
    } catch (error) {
      console.error('Error converting userId to ObjectId:', error);
      return [];
    }
    console.log(month, year, userId);
    const historyLogs = await this.historyLogModel
      .aggregate([
        {
          $match: {
            userId: objectIdUserId,
            createdAt: {
              $gte: startOfMonth,
              $lt: endOfMonth,
            },
          },
        },
        {
          $lookup: {
            from: 'tags',
            localField: 'TagId',
            foreignField: '_id',
            as: 'tagDetails',
          },
        },
        {
          $lookup: {
            from: 'moneysources',
            localField: 'MoneySourceId',
            foreignField: '_id',
            as: 'moneySourceDetails',
          },
        },

        {
          $project: {
            _id: 1,
            TagId: 1,
            MoneySourceId: 1,
            moneyValue: 1,
            type: 1,
            userId: 1,
            createdAt: 1,
            tag: '$tagDetails',
            moneySource: '$moneySourceDetails',
          },
        },
      ])
      .exec();

    return historyLogs;
  }

  // find log from id of moneysource
  async findLogByMoneySourceId(id: string): Promise<any> {
    try {
      const logHistory = await this.historyLogModel
        .find({ MoneySourceId: id })
        .exec();
      let expenseValue = 0;
      let incomeValue = 0;
      logHistory.forEach((log) => {
        if (log.type === logType.CHI) {
          expenseValue += log.moneyValue;
        } else if (log.type === logType.THU) {
          incomeValue += log.moneyValue;
        }
      });
      return {
        logHistory,
        expenseValue,
        incomeValue,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch log history',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getAllLogByUserId(userId: string): Promise<HistoryLog[]> {
    try {
      let objectIdUserId: any;
      if (mongoose.Types.ObjectId.isValid(userId)) {
        objectIdUserId = new mongoose.Types.ObjectId(userId);
      } else {
        throw new Error('Invalid userId format');
      }

      const logHistory = await this.historyLogModel
        .find({ userId: objectIdUserId })
        .populate({
          path: 'TagId',
          model: this.tagModel,
          populate: [
            { path: 'iconId', model: this.iconModel },
            { path: 'colorId', model: this.colorModel },
          ],
        })
        .exec();

      return logHistory;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch log history',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
