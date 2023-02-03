import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, DBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
