/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserSchema } from '../schema/users.schema'; // Import the User and UserSchema
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Use 'Users' as the name
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
