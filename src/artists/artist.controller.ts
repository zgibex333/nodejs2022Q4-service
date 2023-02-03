import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ChangeArtistDTO } from './dto/changeArtist.dto';
import { CreateArtistDTO } from './dto/createArtist.dto';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findMany() {
    return this.artistService.findMany();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.findOne(id);
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDTO) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  change(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() changeArtistDto: ChangeArtistDTO,
  ) {
    return this.artistService.change(id, changeArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.delete(id);
  }
}
