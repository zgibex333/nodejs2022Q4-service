import { Injectable, NotFoundException } from '@nestjs/common';
import DB from 'src/db/db';
import { ChangeAlbumDTO } from './dto/changeAlbum.dto';
import { CreateAlbumDTO } from './dto/createAlbum.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DB) {}

  async findMany() {
    return await this.db.albums.findMany();
  }
  async findOne(id: string) {
    const album = await this.db.albums.findOne({ key: 'id', equals: id });
    if (!album) throw new NotFoundException();
    return album;
  }

  async create(createAlbumDto: CreateAlbumDTO) {
    const { artistId } = createAlbumDto;
    const artist = artistId
      ? await this.db.artists.findOne({
          key: 'id',
          equals: artistId,
        })
      : true;
    if (!artist) throw new NotFoundException();
    return await this.db.albums.create(createAlbumDto);
  }

  async change(id: string, changeAlbumDto: ChangeAlbumDTO) {
    const album = await this.db.albums.findOne({ key: 'id', equals: id });
    if (!album) throw new NotFoundException();
    const { artistId } = changeAlbumDto;
    const artist = artistId
      ? await this.db.artists.findOne({
          key: 'id',
          equals: artistId,
        })
      : true;
    if (!artist) throw new NotFoundException();
    return await this.db.albums.change(id, changeAlbumDto);
  }

  async delete(id: string) {
    const album = await this.db.albums.findOne({ key: 'id', equals: id });
    if (!album) throw new NotFoundException();
    const tracks = await this.db.tracks.findMany({
      key: 'albumId',
      equals: album.id,
    });
    console.log(tracks, 'tracks');
    await Promise.all(
      tracks.map(
        async (track) =>
          await this.db.tracks.change(track.id, { ...track, albumId: null }),
      ),
    );
    return await this.db.albums.delete(id);
  }
}
