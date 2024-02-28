import { Injectable } from '@nestjs/common';
import { Post, Prisma, User } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { PrismaService } from 'src/db/prisma/prisma.service';
import generateRandomId from 'src/utils/generateRandomId';
import { DealDto } from './deals.dto';

@Injectable()
export class DealsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createDeal(dto: DealDto, authorId: Post['authorId']) {
    const { title, content, imgUrl, price, region } = dto;
    console.log(dto);
    console.log(111);
    return await this.prismaService.post.create({
      data: {
        title,
        content,
        imgUrl,
        price,
        region,
        id: generateRandomId(),
        authorId,
      },
    });
  }

  async getDetailDeal(dealId: Post['id']) {
    const deal = await this.prismaService.post.findUnique({
      where: { id: dealId },
      include: {
        author: {
          select: {
            email: true,
          },
        },
      },
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

  async uploadFile(file: Express.Multer.File) {
    const basePath = join(__dirname, '../../../public/images');

    const fileNameBase = nanoid();
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${fileNameBase}.${fileExtension}`;
    const path = join(basePath, fileName);
    try {
      await writeFile(path, file.buffer);
      return `http://localhost:5050/images/${fileName}`;
    } catch (e) {
      throw new Error('Failed to upload image');
    }
  }
}
