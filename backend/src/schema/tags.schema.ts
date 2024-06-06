/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// import { TagType } from 'src/common/enum';

@Schema()
export class Tag extends Document {
  @Prop()
  name: string;

  @Prop({ type: 'ObjectId', ref: 'Color' })
  colorId: string;

  @Prop({ type: 'ObjectId', ref: 'Icon' })
  iconId: string;

  // @Prop()
  // type: TagType;

  @Prop({ type: 'ObjectId', ref: 'User' })
  userId: string;
}

export const TagsSchema = SchemaFactory.createForClass(Tag);
