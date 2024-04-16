/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(user: Partial<User>): Promise<User> {
        try {
            const newUser = new this.userModel(user);
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            const users = await this.userModel.find().exec();
            return users;
        } catch (error) {
            throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
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
            throw new HttpException('Failed to fetch user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, updateUserDto: Partial<User>): Promise<User> {
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
            if (!updatedUser) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return updatedUser;
        } catch (error) {
            throw new HttpException('Failed to update user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: string): Promise<string> {
        try {
            await this.userModel.findByIdAndDelete(id).exec();
            return "User deleted successfully";
        } catch (error) {
            throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
