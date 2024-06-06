/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Color extends Document {
  @Prop()
  code: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
