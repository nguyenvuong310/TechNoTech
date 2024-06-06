import { Module } from '@nestjs/common';
import { MoneySourcesService } from './money-sources.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MoneySourceSchema } from '../schema/moneysource.schema';
import { MoneySourcesController } from './money-sources.controller';
import { UsersModule } from 'src/users/users.module';
import { forwardRef } from '@nestjs/common';
import { HistoryLogModule } from 'src/history-log/history-log.module';
import { TagsModule } from 'src/tags/tags.module';
import { IconsModule } from 'src/icons/icons.module';
import { ColorsModule } from 'src/colors/colors.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MoneySource', schema: MoneySourceSchema },
    ]),
    forwardRef(() => UsersModule),
    forwardRef(() => HistoryLogModule),
    forwardRef(() => TagsModule),
    forwardRef(() => IconsModule),
    forwardRef(() => ColorsModule),
  ],
  controllers: [MoneySourcesController],
  providers: [MoneySourcesService],
  exports: [MoneySourcesService, MongooseModule],
})
export class MoneySourcesModule {}
