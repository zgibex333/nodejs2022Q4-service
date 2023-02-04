import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from 'src/albums/album.interface';
import { ArtistEntity } from 'src/artists/artist.interface';
import { TrackEntity } from 'src/tracks/track.interface';

export class FavoritesEntity {
  @ApiProperty({
    type: [ArtistEntity],
  })
  artists: string[]; // favorite artists ids

  @ApiProperty({
    type: [AlbumEntity],
  })
  albums: string[]; // favorite albums ids

  @ApiProperty({
    type: [TrackEntity],
  })
  tracks: string[]; // favorite tracks ids
}
