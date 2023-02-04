import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import DB from 'src/db/db';

@Injectable()
export class FavouritesService {
  constructor(private readonly db: DB) {}

  async findMany() {
    const favsIdsObject = await this.db.favourites.getFavs();
    const { albums, artists, tracks } = favsIdsObject;
    const response = {
      albums: await Promise.all(
        albums.map(async (albumId) => {
          return await this.db.albums.findOne({ key: 'id', equals: albumId });
        }),
      ),
      artists: await Promise.all(
        artists.map(async (artistId) => {
          return await this.db.artists.findOne({ key: 'id', equals: artistId });
        }),
      ),
      tracks: await Promise.all(
        tracks.map(async (trackId) => {
          return await this.db.tracks.findOne({ key: 'id', equals: trackId });
        }),
      ),
    };
    return response;
  }

  async changeFavTracks(id: string) {
    const track = await this.db.tracks.findOne({ key: 'id', equals: id });
    if (!track) throw new UnprocessableEntityException();
    const favsIdsObject = await this.db.favourites.getFavs();
    const duplicate = favsIdsObject.tracks.find((id) => id === track.id);
    if (duplicate) {
      throw new ForbiddenException();
    }
    await this.db.favourites.addToTracks(id);
    return { messsage: `Track with ID:${id} was added to favs` };
  }

  async changeFavAlbums(id: string) {
    const album = await this.db.albums.findOne({ key: 'id', equals: id });
    if (!album) throw new UnprocessableEntityException();
    const favsIdsObject = await this.db.favourites.getFavs();
    const duplicate = favsIdsObject.albums.find((id) => id === album.id);
    if (duplicate) {
      throw new ForbiddenException();
    }
    await this.db.favourites.addToAlbums(id);
    return { messsage: `Album with ID:${id} was added to favs` };
  }

  async changeFavArtists(id: string) {
    const artist = await this.db.artists.findOne({ key: 'id', equals: id });
    if (!artist) throw new UnprocessableEntityException();
    const favsIdsObject = await this.db.favourites.getFavs();
    const duplicate = favsIdsObject.artists.find((id) => id === artist.id);
    if (duplicate) {
      throw new ForbiddenException();
    }
    await this.db.favourites.addToArtists(id);
    return { messsage: `Artist with ID:${id} was added to favs` };
  }

  async deleteFavTrack(id: string) {
    const track = await this.db.tracks.findOne({ key: 'id', equals: id });
    if (!track) throw new UnprocessableEntityException();
    await this.db.favourites.removeFromTracks(id);
    return { messsage: `Track with ID:${id} was deleted from favs` };
  }

  async deleteFavAlbum(id: string) {
    const album = await this.db.albums.findOne({ key: 'id', equals: id });
    if (!album) throw new UnprocessableEntityException();
    await this.db.favourites.removeFromAlbums(id);
    return { messsage: `Album with ID:${id} was deleted from favs` };
  }

  async deleteFavArtist(id: string) {
    const artist = await this.db.artists.findOne({ key: 'id', equals: id });
    if (!artist) throw new UnprocessableEntityException();
    await this.db.favourites.removeFromArtists(id);
    return { messsage: `Artist with ID:${id} was deleted from favs` };
  }
}
