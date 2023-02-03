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
import { ChangeTrackDTO } from './dto/changeTrack.dto';
import { CreateTrackDTO } from './dto/createTrack.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findMany() {
    return this.trackService.findMany();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.findOne(id);
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDTO) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  change(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() changeTrackDto: ChangeTrackDTO,
  ) {
    return this.trackService.change(id, changeTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.delete(id);
  }
}
