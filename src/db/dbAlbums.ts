import { v4 as uuidv4 } from 'uuid';
import DBEntity from './DBEntity';

export type AlbumEntity = {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
};
type CreateAlbumDTO = Omit<AlbumEntity, 'id'>;
type ChangeAlbumDTO = Partial<Omit<AlbumEntity, 'id'>>;

export default class DBAlbums extends DBEntity<
  AlbumEntity,
  ChangeAlbumDTO,
  CreateAlbumDTO
> {
  async create(dto: CreateAlbumDTO) {
    const created: AlbumEntity = {
      ...dto,
      id: uuidv4(),
    };
    this.entities.push(created);
    return created;
  }
}
