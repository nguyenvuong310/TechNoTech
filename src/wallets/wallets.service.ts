/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './wallets.schema';

@Injectable()
export class WalletsService {
    constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) { }

    async create(walletDto: Partial<Wallet>): Promise<Wallet> {
        try {
            const createdWallet = new this.walletModel(walletDto);
            return await createdWallet.save();
        } catch (error) {
            throw new HttpException('Failed to create wallet', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<Wallet[]> {
        try {
            return await this.walletModel.find().exec();
        } catch (error) {
            throw new HttpException('Failed to find wallets', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findById(id: string): Promise<Wallet | null> {
        try {
            const wallet = await this.walletModel.findById(id).exec();
            if (!wallet) {
                throw new NotFoundException('Wallet not found');
            }
            return wallet;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new HttpException('Failed to find wallet', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, updatedWalletDto: Partial<Wallet>): Promise<Wallet | null> {
        try {
            const wallet = await this.walletModel.findByIdAndUpdate(id, updatedWalletDto, { new: true }).exec();
            if (!wallet) {
                throw new NotFoundException('Wallet not found');
            }
            return wallet;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new HttpException('Failed to update wallet', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: string): Promise<string> {
        try {
            const result = await this.walletModel.findByIdAndDelete(id).exec();
            if (!result) {
                return 'Wallet deleted successfully';
            }
            return 'Wallet deleted successfully';
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new HttpException('Failed to delete wallet', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
