import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './users.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}
  async findMany() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      const newUser: UserEntity = {
        ...user,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
      };
      return new UserEntity(newUser);
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException();
    const newUser: UserEntity = {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
    return new UserEntity(newUser);
  }

  async create(createUserDTO: CreateUserDTO) {
    const user = await this.prisma.user.create({
      data: createUserDTO,
    });
    const newUser: UserEntity = {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
    return new UserEntity(newUser);
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException();
    const deleteduser = await this.prisma.user.delete({ where: { id } });
    const newUser: UserEntity = {
      ...deleteduser,
      createdAt: deleteduser.createdAt.getTime(),
      updatedAt: deleteduser.updatedAt.getTime(),
    };
    return new UserEntity(newUser);
  }

  async change(id: string, passwords: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException();
    const { oldPassword, newPassword } = passwords;
    if (oldPassword !== user.password) throw new ForbiddenException();
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
        version: {
          increment: 1
        }
      },
    });
    const newUser: UserEntity = {
      ...updatedUser,
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
    };
    return new UserEntity(newUser);
  }
}
