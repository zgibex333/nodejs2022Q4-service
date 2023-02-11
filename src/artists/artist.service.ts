import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangeArtistDTO } from './dto/changeArtist.dto';
import { CreateArtistDTO } from './dto/createArtist.dto';

@Injectable()
export class ArtistService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findMany() {
    return await this.prisma.artist.findMany();
  }
  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) throw new NotFoundException();
    return artist;
  }

  async create(CreateArtistDto: CreateArtistDTO) {
    return await this.prisma.artist.create({
      data: CreateArtistDto,
    });
  }

  async change(id: string, changeArtistDto: ChangeArtistDTO) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) throw new NotFoundException();
    return await this.prisma.artist.update({
      where: {
        id,
      },
      data: changeArtistDto,
    });
  }

  async delete(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) throw new NotFoundException();
    return await this.prisma.artist.delete({
      where: {
        id,
      },
    });
  }
}
