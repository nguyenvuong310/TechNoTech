/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { ApiProperty } from '@nestjs/swagger';
@Schema()
export class Icon extends Document {
  @Prop()
  url: string;
}

export const IconsSchema = SchemaFactory.createForClass(Icon);
