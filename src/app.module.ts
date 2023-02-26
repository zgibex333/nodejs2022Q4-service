import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AlbumModule } from './albums/album.module';
import { AppController } from './app.controller';
import { ArtistModule } from './artists/artist.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/JwtAuthGuard';
import { DBModule } from './db/db.module';
import { FavoritesModule } from './favourites/favourites.module';
import { PrismaModule } from './prisma/prisma.module';
import { TrackModule } from './tracks/track.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TrackModule,
    ArtistModule,
    DBModule,
    AlbumModule,
    FavoritesModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
