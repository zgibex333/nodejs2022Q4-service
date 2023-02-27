import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import DB from 'src/db/db';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavouritesService {
  constructor(
    private readonly db: DB,
    private readonly prisma: PrismaService,
  ) {}

  async findMany() {
    return {
      albums: (
        await this.prisma.favAlbum.findMany({
          select: {
            album: true,
          },
        })
      ).map((item) => item.album),
      tracks: (
        await this.prisma.favTrack.findMany({
          select: {
            track: true,
          },
        })
      ).map((item) => item.track),
      artists: (
        await this.prisma.favArtist.findMany({
          select: {
            artist: true,
          },
        })
      ).map((item) => item.artist),
    };
  }

  async changeFavTracks(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) throw new UnprocessableEntityException();
    try {
      await this.prisma.favTrack.create({
        data: {
          id,
        },
      });
      return { messsage: `Track with ID:${id} was added to favs` };
    } catch {
      throw new ForbiddenException();
    }
  }

  async changeFavAlbums(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) throw new UnprocessableEntityException();
    try {
      await this.prisma.favAlbum.create({
        data: {
          id,
        },
      });
      return { messsage: `Album with ID:${id} was added to favs` };
    } catch {
      throw new ForbiddenException();
    }
  }

  async changeFavArtists(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) throw new UnprocessableEntityException();
    try {
      await this.prisma.favArtist.create({
        data: {
          id,
        },
      });
      return { messsage: `Artist with ID:${id} was added to favs` };
    } catch {
      throw new ForbiddenException();
    }
  }

  async deleteFavTrack(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) throw new UnprocessableEntityException();
    await this.prisma.favTrack.delete({
      where: { id },
    });
    return { messsage: `Track with ID:${id} was deleted from favs` };
  }

  async deleteFavAlbum(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) throw new UnprocessableEntityException();
    await this.prisma.favAlbum.delete({
      where: { id },
    });
    return { messsage: `Album with ID:${id} was deleted from favs` };
  }

  async deleteFavArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) throw new UnprocessableEntityException();
    await this.prisma.favArtist.delete({
      where: { id },
    });
    return { messsage: `Artist with ID:${id} was deleted from favs` };
  }
}
