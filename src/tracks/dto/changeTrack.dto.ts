import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, ValidateIf } from 'class-validator';

export class ChangeTrackDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    format: 'uuid',
  })
  @ValidateIf((prop) => prop.artistId !== null)
  @IsNotEmpty()
  @IsString()
  artistId: string | null; // refers to Artist

  @ApiProperty({
    format: 'uuid',
  })
  @ValidateIf((prop) => prop.albumId !== null)
  @IsNotEmpty()
  @IsString()
  albumId: string | null; // refers to Album

  @ApiProperty()
  @IsInt()
  duration: number; // integer number
}
