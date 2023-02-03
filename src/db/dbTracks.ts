import { v4 as uuidv4 } from 'uuid';
import DBEntity from './DBEntity';

export type TrackEntity = {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
};
type CreateTrackDTO = Omit<TrackEntity, 'id'>;
type ChangeTrackDTO = Omit<TrackEntity, 'id'>;

export default class DBTracks extends DBEntity<
  TrackEntity,
  CreateTrackDTO,
  ChangeTrackDTO
> {
  async create(dto: CreateTrackDTO) {
    const created: TrackEntity = {
      ...dto,
      id: uuidv4(),
    };
    this.entities.push(created);
    return created;
  }
}
