/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { moneySourceType } from 'src/common/enum';

@Schema()
export class MoneySource extends Document {
  @Prop()
  name: string;

  @Prop({ type: 'ObjectId', ref: 'Tag' })
  TagId: string;

  @Prop()
  currentMoney: number;

  @Prop()
  expectedMoney: number;

  @Prop()
  Budget: number;

  @Prop()
  type: moneySourceType;

  @Prop({ type: 'ObjectId', ref: 'User' })
  userId: string;

  @Prop()
  createdAt: Date;
}

export const MoneySourceSchema = SchemaFactory.createForClass(MoneySource);
