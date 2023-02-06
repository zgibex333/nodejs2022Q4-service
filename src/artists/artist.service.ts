import { Injectable, NotFoundException } from '@nestjs/common';
import DB from 'src/db/db';
import { ChangeArtistDTO } from './dto/changeArtist.dto';
import { CreateArtistDTO } from './dto/createArtist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DB) {}

  async findMany() {
    return await this.db.artists.findMany();
  }
  async findOne(id: string) {
    const artist = await this.db.artists.findOne({ key: 'id', equals: id });
    if (!artist) throw new NotFoundException();
    return artist;
  }

  async create(createTrackDto: CreateArtistDTO) {
    return await this.db.artists.create(createTrackDto);
  }

  async change(id: string, changeArtistDto: ChangeArtistDTO) {
    const artist = await this.db.artists.findOne({ key: 'id', equals: id });
    if (!artist) throw new NotFoundException();
    return await this.db.artists.change(id, changeArtistDto);
  }

  async delete(id: string) {
    const artist = await this.db.artists.findOne({ key: 'id', equals: id });
    if (!artist) throw new NotFoundException();
    const tracks = await this.db.tracks.findMany({
      key: 'artistId',
      equals: artist.id,
    });
    await Promise.all(
      tracks.map(
        async (track) =>
          await this.db.tracks.change(track.id, { ...track, artistId: null }),
      ),
    );
    const albums = await this.db.albums.findMany({
      key: 'artistId',
      equals: artist.id,
    });
    await Promise.all(
      albums.map(
        async (album) =>
          await this.db.albums.change(album.id, { ...album, artistId: null }),
      ),
    );
    await this.db.favourites.removeFromArtists(id);
    return await this.db.artists.delete(id);
  }
}
