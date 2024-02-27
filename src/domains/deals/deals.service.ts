import { Injectable } from '@nestjs/common';
import { Post, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';
import generateRandomId from 'src/utils/generateRandomId';
import { DealDto } from './deals.dto';

@Injectable()
export class DealsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createDeal(dto: DealDto, authorId: Post['authorId']) {
    return await this.prismaService.post.create({
      data: {
        id: generateRandomId(),
        ...dto,
        authorId,
      },
    });
  }

  async getDetailDeal(dealId: Post['id']) {
    const deal = await this.prismaService.post.findUnique({
      where: { id: dealId },
    });
    return deal;
  }

  async getMyWrote(authorId: Post['authorId']) {
    const deals = await this.prismaService.post.findMany({
      where: { authorId },
    });
    return deals;
  }

  async getMyLikes(id: User['id']) {
    const deals = await this.prismaService.user.findMany({
      where: { id },
      include: {
        likedPosts: {
          select: {
            post: true,
          },
        },
      },
    });
    return deals;
  }

  async getDealsByLatest() {
    const deals = await this.prismaService.post.findMany({
      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
    });
    return deals;
  }

  async getDealsByViews() {
    const deals = await this.prismaService.post.findMany({
      orderBy: {
        views: Prisma.SortOrder.desc,
      },
    });
    return deals;
  }

  // async getDealsByLikes() {
  //   const deals = await this.prismaService.post.findMany({
  //     include:{
  //       likedPost:{orderBy:{

  //       }}
  //     }

  //   });
  // }

  async updateDeal(
    dealId: Post['id'],
    dto: DealDto,
    authorId: Post['authorId'],
  ) {
    const deals = await this.prismaService.post.update({
      where: { id: dealId },
      data: {
        ...dto,
        authorId,
      },
    });
    return deals;
  }
}
