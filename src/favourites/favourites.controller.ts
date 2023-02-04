import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';

@Controller('favs')
export class FavouritesProvider {
  constructor(private readonly trackService: FavouritesService) {}

  @Get()
  findMany() {
    return this.trackService.findMany();
  }

  @Post('track/:id')
  addFavTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.changeFavTracks(id);
  }
  @Post('album/:id')
  addFavAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.changeFavAlbums(id);
  }
  @Post('artist/:id')
  addFavArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.changeFavArtists(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteFavTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.deleteFavTrack(id);
  }
  @Delete('album/:id')
  @HttpCode(204)
  deleteFavAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.deleteFavAlbum(id);
  }
  @Delete('artist/:id')
  @HttpCode(204)
  deleteFavArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.deleteFavArtist(id);
  }
}
