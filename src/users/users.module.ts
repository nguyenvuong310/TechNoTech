/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserSchema } from '../schema/users.schema'; // Import the User and UserSchema
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryLogModule } from 'src/history-log/history-log.module';
import { forwardRef } from '@nestjs/common';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Use 'Users' as the name
    forwardRef(() => HistoryLogModule),
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService], // Export the UserService
})
export class UsersModule {}
