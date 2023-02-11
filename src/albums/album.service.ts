import { Injectable, NotFoundException } from '@nestjs/common';
import DB from 'src/db/db';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangeAlbumDTO } from './dto/changeAlbum.dto';
import { CreateAlbumDTO } from './dto/createAlbum.dto';

@Injectable()
export class AlbumService {
  constructor(
    private readonly db: DB,
    private readonly prisma: PrismaService,
  ) {}

  async findMany() {
    return await this.prisma.album.findMany();
  }
  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) throw new NotFoundException();
    return album;
  }

  async create(createAlbumDto: CreateAlbumDTO) {
    try {
      const artist = await this.prisma.album.create({ data: createAlbumDto });
      return artist;
    } catch {
      throw new NotFoundException();
    }
  }

  async change(id: string, changeAlbumDto: ChangeAlbumDTO) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) throw new NotFoundException();
    try {
      return await this.prisma.album.update({
        where: {
          id,
        },
        data: changeAlbumDto,
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async delete(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) throw new NotFoundException();
    return await this.prisma.album.delete({
      where: {
        id,
      },
    });
  }
}
