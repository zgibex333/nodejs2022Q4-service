import { Module } from '@nestjs/common';
import { FavouritesProvider } from './favourites.controller';
import { FavouritesService } from './favourites.service';

@Module({
  controllers: [FavouritesProvider],
  providers: [FavouritesService],
})
export class FavoritesModule {}
