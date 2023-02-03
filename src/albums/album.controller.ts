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
import { ChangeAlbumDTO } from './dto/changeAlbum.dto';
import { CreateAlbumDTO } from './dto/createAlbum.dto';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findMany() {
    return this.albumService.findMany();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.findOne(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDTO) {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  change(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() changeAlbumDto: ChangeAlbumDTO,
  ) {
    return this.albumService.change(id, changeAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.delete(id);
  }
}
