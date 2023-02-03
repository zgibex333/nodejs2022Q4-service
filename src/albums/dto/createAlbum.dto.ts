import { IsNotEmpty, IsString, IsInt, ValidateIf } from 'class-validator';

export class CreateAlbumDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @ValidateIf((prop) => prop.artistId !== null)
  @IsNotEmpty()
  @IsString()
  artistId: string | null; // refers to Artist
}
