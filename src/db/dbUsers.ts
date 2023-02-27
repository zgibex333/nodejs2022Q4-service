import { ChangeUserDTO } from 'src/users/dto/changeUser.dto';
import { CreateUserDTO } from 'src/users/dto/createUser.dto';
import { UserEntity } from 'src/users/users.interface';
import { v4 as uuidv4 } from 'uuid';
import DBEntity from './dbEntity';
import { NoRequiredEntity } from './errors/error';

export default class DBUsers extends DBEntity<
  UserEntity,
  ChangeUserDTO,
  CreateUserDTO
> {
  async create(dto: CreateUserDTO) {
    const created: UserEntity = {
      ...dto,
      createdAt: this.timestamp(),
      updatedAt: this.timestamp(),
      version: 1,
      id: uuidv4(),
    };
    this.entities.push(created);
    return created;
  }
  timestamp(): number {
    return Date.now();
  }

  async change(id: string, changeDTO: ChangeUserDTO): Promise<UserEntity> {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx === -1) throw new NoRequiredEntity('change');
    const entity = this.entities[idx];
    const changed = {
      ...entity,
      ...changeDTO,
      updatedAt: this.timestamp(),
      version: ++entity.version,
    };
    this.entities.splice(idx, 1, changed);
    return changed;
  }
}
