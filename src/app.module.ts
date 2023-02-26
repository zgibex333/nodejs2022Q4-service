import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AlbumController } from './albums/album.controller';
import { AlbumModule } from './albums/album.module';
import { AppController } from './app.controller';
import { ArtistController } from './artists/artist.controller';
import { ArtistModule } from './artists/artist.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/JwtAuthGuard';
import { DBModule } from './db/db.module';
import { FavouritesProvider } from './favourites/favourites.controller';
import { FavoritesModule } from './favourites/favourites.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { TrackController } from './tracks/track.controller';
import { TrackModule } from './tracks/track.module';
import { UsersController } from './users/users.controller';
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
    LoggerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        UsersController,
        AuthController,
        FavouritesProvider,
        AlbumController,
        TrackController,
        ArtistController,
      );
  }
}
