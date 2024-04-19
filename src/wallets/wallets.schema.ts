/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Wallet extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ default: 0 })
    balance: number;

    @Prop()
    userId: string;

    // Add more properties as needed
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
