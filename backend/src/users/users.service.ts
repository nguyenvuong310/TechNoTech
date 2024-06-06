/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/users.schema';
import { HistoryLogService } from 'src/history-log/history-log.service';
import { logType } from 'src/common/enum';
import { forwardRef, Inject } from '@nestjs/common';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => HistoryLogService))
    private historyLogService: HistoryLogService,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    try {
      const newUser = new this.userModel(user);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find({}, { password: 0 }).exec();
      return users;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, {
          new: true,
          select: '-password',
        })
        .exec();
      if (!updatedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return updatedUser;
    } catch (error) {
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const user = await this.userModel.findById(id).exec();
      console.log(user);
      if (!user) {
        return 'User deleted successfully'; // Or you can customize the message as needed
      }
      await this.userModel.deleteOne({ _id: id }).exec();
      return 'User deleted successfully';
    } catch (error) {
      throw new HttpException(
        'Failed to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async login(username: string, password: string): Promise<User> {
    try {
      console.log('user', username);
      console.log('pass', password);
      const user = await this.userModel.findOne({ username: username }).exec();
      console.log(user);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      if (user.password !== password) {
        throw new HttpException(
          'Password is incorrect',
          HttpStatus.BAD_REQUEST,
        );
      }
      //can not delete obj of document mongoose
      const userNoPassword = user.toObject();
      delete userNoPassword.password;
      return userNoPassword;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getMoney(userId: string): Promise<any> {
    try {
      const user = await this.userModel.findById(userId).exec();

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const currentBalance = user?.totalMoney;
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      console.log(month, year);
      const incomeValue = await this.historyLogService.calcTotalMoneyMonth(
        month,
        year,
        logType.THU,
      );
      const expenseValue = await this.historyLogService.calcTotalMoneyMonth(
        month,
        year,
        logType.CHI,
      );
      return {
        currentBalance,
        incomeValue,
        expenseValue,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
