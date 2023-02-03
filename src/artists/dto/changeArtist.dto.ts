import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class ChangeArtistDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
