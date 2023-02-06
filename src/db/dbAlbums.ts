import { AlbumEntity } from 'src/albums/album.interface';
import { ChangeAlbumDTO } from 'src/albums/dto/changeAlbum.dto';
import { CreateAlbumDTO } from 'src/albums/dto/createAlbum.dto';
import { v4 as uuidv4 } from 'uuid';
import DBEntity from './DBEntity';

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
