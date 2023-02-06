import { ApiProperty } from '@nestjs/swagger';

export class ArtistEntity {
  @ApiProperty({
    format: 'uuid',
  })
  id: string; // uuid v4

  @ApiProperty({
    example: 'Freddie Mercury',
  })
  name: string;

  @ApiProperty()
  grammy: boolean;
}
