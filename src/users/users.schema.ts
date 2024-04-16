/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    username: string;

    @Prop()
    phone: string;

    // Add more properties as needed
}

export const UserSchema = SchemaFactory.createForClass(User);
