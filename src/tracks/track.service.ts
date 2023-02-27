import { Injectable, NotFoundException } from '@nestjs/common';
import DB from 'src/db/db';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangeTrackDTO } from './dto/changeTrack.dto';
import { CreateTrackDTO } from './dto/createTrack.dto';

@Injectable()
export class TrackService {
  constructor(
    private readonly db: DB,
    private readonly prisma: PrismaService,
  ) {}

  async findMany() {
    return await this.prisma.track.findMany();
  }
  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) throw new NotFoundException();
    return await track;
  }

  async create(createTrackDto: CreateTrackDTO) {
    try {
      const track = await this.prisma.track.create({
        data: createTrackDto,
      });
      return track;
    } catch {
      throw new NotFoundException();
    }
  }

  async change(id: string, changeTrackDto: ChangeTrackDTO) {
    try {
      return await this.prisma.track.update({
        where: {
          id,
        },
        data: changeTrackDto,
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async delete(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) throw new NotFoundException();
    return await this.prisma.track.delete({
      where: {
        id,
      },
    });
  }
}
