/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { ApiProperty } from '@nestjs/swagger';
import { logType } from '../common/enum';

@Schema()
export class HistoryLog extends Document {
  @Prop()
  name: string;

  @Prop({ type: 'ObjectId', ref: 'Tag' }) // danh muc
  TagId: string;

  @Prop({ type: 'ObjectId', ref: 'MoneySource' }) // nguon tien
  MoneySourceId: string;

  @Prop({ type: 'ObjectId', ref: 'MoneySource' }) // neu type = chuyen
  MoneyDestId: string;

  @Prop()
  moneyValue: number;

  @Prop()
  type: logType;

  @Prop({ type: 'ObjectId', ref: 'User' })
  userId: string;

  @Prop()
  createdAt: Date;
}

export const logSchema = SchemaFactory.createForClass(HistoryLog);
