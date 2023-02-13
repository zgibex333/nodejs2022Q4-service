import { ArtistEntity } from 'src/artists/artist.interface';
import { ChangeArtistDTO } from 'src/artists/dto/changeArtist.dto';
import { CreateArtistDTO } from 'src/artists/dto/createArtist.dto';
import { v4 as uuidv4 } from 'uuid';
import DBEntity from './dbEntity';

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
