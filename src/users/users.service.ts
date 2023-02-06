import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import DB from 'src/db/db';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './users.interface';

@Injectable()
export class UsersService {
  constructor(private readonly db: DB) {}
  async findMany() {
    const users = await this.db.users.findMany();

    return users.map((user) => new UserEntity(user));
  }

  async findOne(id: string) {
    const user = await this.db.users.findOne({ key: 'id', equals: id });
    if (!user) throw new NotFoundException();
    return new UserEntity(user);
  }

  async create(createUserDTO: CreateUserDTO) {
    const user = await this.db.users.create(createUserDTO);
    return new UserEntity(user);
  }

  async delete(id: string) {
    const user = await this.db.users.findOne({ key: 'id', equals: id });
    if (!user) throw new NotFoundException();
    await this.db.users.delete(id);
    return new UserEntity(user);
  }

  async change(id: string, passwords: UpdatePasswordDto) {
    const user = await this.db.users.findOne({ key: 'id', equals: id });
    if (!user) throw new NotFoundException();
    const { oldPassword, newPassword } = passwords;
    if (oldPassword !== user.password) throw new ForbiddenException();
    const newUser = await this.db.users.change(id, { password: newPassword });
    return new UserEntity(newUser);
  }
}
