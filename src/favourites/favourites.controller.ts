import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FavoritesEntity } from './favourites.interface';
import { FavouritesService } from './favourites.service';

@ApiTags('Favorites')
@Controller('favs')
export class FavouritesProvider {
  constructor(private readonly trackService: FavouritesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites albums, tracks and artists',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: FavoritesEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  findMany() {
    return this.trackService.findMany();
  }

  @Post('track/:id')
  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiCreatedResponse({
    description: 'Added succesfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad. trackId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiUnprocessableEntityResponse({
    description: "Track with id doesn't exist.",
  })
  addFavTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.changeFavTracks(id);
  }

  @Post('album/:id')
  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiCreatedResponse({
    description: 'Added succesfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad. albumId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiUnprocessableEntityResponse({
    description: "Album with id doesn't exist.",
  })
  addFavAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.changeFavAlbums(id);
  }

  @Post('artist/:id')
  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiCreatedResponse({
    description: 'Added succesfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad. artistId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiUnprocessableEntityResponse({
    description: "Artist with id doesn't exist.",
  })
  addFavArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.changeFavArtists(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites',
  })
  @ApiCreatedResponse({
    description: 'Deleted succesfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'Track was not found.',
  })
  deleteFavTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.deleteFavTrack(id);
  }
  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiCreatedResponse({
    description: 'Deleted succesfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'Album was not found.',
  })
  deleteFavAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.deleteFavAlbum(id);
  }
  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiCreatedResponse({
    description: 'Deleted succesfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'Artist was not found.',
  })
  deleteFavArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.deleteFavArtist(id);
  }
}
