import { Injectable, NotFoundException } from '@nestjs/common';
import DB from 'src/db/db';
import { ChangeTrackDTO } from './dto/changeTrack.dto';
import { CreateTrackDTO } from './dto/createTrack.dto';

@Injectable()
export class TrackService {
  constructor(private readonly db: DB) {}

  async findMany() {
    return await this.db.tracks.findMany();
  }
  async findOne(id: string) {
    const track = await this.db.tracks.findOne({ key: 'id', equals: id });
    if (!track) throw new NotFoundException();
    return await this.db.tracks.findOne({ key: 'id', equals: id });
  }

  async create(createTrackDto: CreateTrackDTO) {
    const { albumId, artistId } = createTrackDto;
    const album = albumId
      ? await this.db.albums.findOne({ key: 'id', equals: albumId })
      : true;
    const artist = artistId
      ? await this.db.artists.findOne({
          key: 'id',
          equals: artistId,
        })
      : true;
    if (!album || !artist) throw new NotFoundException();
    return await this.db.tracks.create(createTrackDto);
  }

  async change(id: string, changeTrackDto: ChangeTrackDTO) {
    const track = await this.db.tracks.findOne({ key: 'id', equals: id });
    if (!track) throw new NotFoundException();
    const { albumId, artistId } = changeTrackDto;
    const album = albumId
      ? await this.db.albums.findOne({ key: 'id', equals: albumId })
      : true;
    const artist = artistId
      ? await this.db.artists.findOne({
          key: 'id',
          equals: artistId,
        })
      : true;
    if (!album || !artist) throw new NotFoundException();
    return await this.db.tracks.change(id, changeTrackDto);
  }

  async delete(id: string) {
    const track = await this.db.tracks.findOne({ key: 'id', equals: id });
    console.log('FOUND', track);
    if (!track) throw new NotFoundException();

    return await this.db.tracks.delete(id);
  }
}
