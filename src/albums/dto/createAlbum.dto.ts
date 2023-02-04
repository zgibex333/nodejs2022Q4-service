import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, ValidateIf } from 'class-validator';

export class CreateAlbumDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  year: number;

  @ApiProperty({
    format: 'uuid',
  })
  @ValidateIf((prop) => prop.artistId !== null)
  @IsNotEmpty()
  @IsString()
  artistId: string | null; // refers to Artist
}
