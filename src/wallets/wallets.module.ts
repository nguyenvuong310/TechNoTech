/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { WalletSchema } from './wallets.schema';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }]), // Use 'User' as the name
    ],
    controllers: [WalletsController],
    providers: [WalletsService],
})
export class WalletsModule { }
