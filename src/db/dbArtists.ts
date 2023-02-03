import { v4 as uuidv4 } from 'uuid';
import DBEntity from './DBEntity';

export type ArtistEntity = {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
};
type CreateArtistDTO = Omit<ArtistEntity, 'id'>;
type ChangeArtistDTO = Omit<ArtistEntity, 'id'>;

export default class DBArtists extends DBEntity<
  ArtistEntity,
  CreateArtistDTO,
  ChangeArtistDTO
> {
  async create(dto: CreateArtistDTO) {
    const created: ArtistEntity = {
      ...dto,
      id: uuidv4(),
    };
    this.entities.push(created);
    return created;
  }
}
