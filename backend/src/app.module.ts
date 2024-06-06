import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ColorsModule } from './colors/colors.module';
import { IconsModule } from './icons/icons.module';
import { TagsModule } from './tags/tags.module';
import { MoneySourcesModule } from './money-sources/money-sources.module';
import { HistoryLogModule } from './history-log/history-log.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const database = configService.get('MONGO_DATABASE');
        const host = configService.get('MONGO_HOST');

        return {
          uri: `mongodb+srv://${username}:${password}@${host}`,
          dbName: database,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    ColorsModule,
    IconsModule,
    TagsModule,
    MoneySourcesModule,
    HistoryLogModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule {}
