import { Module } from '@nestjs/common';
import { AlbumModule } from './albums/album.module';
import { ArtistModule } from './artists/artist.module';
import { DBModule } from './db/db.module';
import { FavoritesModule } from './favourites/favourites.module';
import { PrismaModule } from './prisma/prisma.module';
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
    PrismaModule,
  ],
})
export class AppModule {}
