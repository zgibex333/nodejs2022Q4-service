import { Global, Module } from '@nestjs/common';
import DB from './db';

@Global()
@Module({
  providers: [DB],
  exports: [DB],
})
export class DBModule {}
