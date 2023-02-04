import { ApiProperty } from '@nestjs/swagger';

export class AlbumEntity {
  @ApiProperty({
    format: 'uuid',
  })
  id: string; // uuid v4

  @ApiProperty({
    example: 'Innuendo',
  })
  name: string;

  @ApiProperty({
    example: '1991',
  })
  year: number;

  @ApiProperty({
    format: 'uuid',
  })
  artistId: string | null; // refers to Artist
}
