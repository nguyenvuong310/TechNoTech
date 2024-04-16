/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, UserSchema } from './users.schema'; // Import the User and UserSchema
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Use 'User' as the name
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule { }
