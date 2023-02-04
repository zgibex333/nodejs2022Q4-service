import { Module } from '@nestjs/common';
import { AlbumModule } from './albums/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artists/artist.module';
import { DBModule } from './db/db.module';
import { FavoritesModule } from './favourites/favourites.module';
import { TrackModule } from './tracks/track.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TrackModule,
    ArtistModule,
    DBModule,
    AlbumModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
