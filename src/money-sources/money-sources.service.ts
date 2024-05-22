import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MoneySource } from 'src/schema/moneysource.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
@Injectable()
export class MoneySourcesService {
  constructor(
    @InjectModel(MoneySource.name) private moneySourceModel: Model<MoneySource>,
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
      const updatedMoneySource = await this.moneySourceModel.findByIdAndUpdate(
        id,
        moneySource,
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
      await this.moneySourceModel.findByIdAndDelete(id);
      return 'Money Source deleted successfully';
    } catch (error) {
      throw new HttpException(
        'Failed to delete money source',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
