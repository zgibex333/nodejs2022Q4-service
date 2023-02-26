import { ChangeTrackDTO } from 'src/tracks/dto/changeTrack.dto';
import { CreateTrackDTO } from 'src/tracks/dto/createTrack.dto';
import { TrackEntity } from 'src/tracks/track.interface';
import { v4 as uuidv4 } from 'uuid';
import DBEntity from './dbEntity';

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
