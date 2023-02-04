import { ApiProperty } from '@nestjs/swagger';

export class TrackEntity {
  @ApiProperty({
    format: 'uuid',
  })
  id: string; // uuid v4

  @ApiProperty({
    example: 'The Show Must Go On',
  })
  name: string;

  @ApiProperty({
    format: 'uuid',
  })
  artistId: string | null; // refers to Artist

  @ApiProperty({
    format: 'uuid',
  })
  albumId: string | null; // refers to Album

  @ApiProperty({
    example: '262',
  })
  duration: number; // integer number
}
