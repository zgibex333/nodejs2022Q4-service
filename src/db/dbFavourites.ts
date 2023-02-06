import { FavoritesEntity } from 'src/favourites/favourites.interface';

export default class DBFavourites extends FavoritesEntity {
  constructor() {
    super();
    this.albums = [];
    this.artists = [];
    this.tracks = [];
  }

  async addToAlbums(id: string) {
    await Promise.resolve().then(() => this.albums.push(id));
  }

  async addToArtists(id: string) {
    await Promise.resolve().then(() => this.artists.push(id));
  }

  async addToTracks(id: string) {
    await Promise.resolve().then(() => this.tracks.push(id));
  }

  async removeFromAlbums(id: string) {
    await Promise.resolve().then(() => {
      const index = this.albums.findIndex((albumId) => albumId === id);
      if (index >= 0) {
        this.albums.splice(index, 1);
      }
    });
  }

  async removeFromArtists(id: string) {
    await Promise.resolve().then(() => {
      const index = this.artists.findIndex((albumId) => albumId === id);
      if (index >= 0) {
        this.artists.splice(index, 1);
      }
    });
  }

  async removeFromTracks(id: string) {
    await Promise.resolve().then(() => {
      const index = this.tracks.findIndex((albumId) => albumId === id);
      if (index >= 0) {
        this.tracks.splice(index, 1);
      }
    });
  }

  async getFavs() {
    return await Promise.resolve().then(() => ({
      albums: this.albums,
      tracks: this.tracks,
      artists: this.artists,
    }));
  }
}
