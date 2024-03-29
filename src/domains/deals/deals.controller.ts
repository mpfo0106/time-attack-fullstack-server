import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { Private } from 'src/decorators/private.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { DealDto } from './deals.dto';
import { DealsService } from './deals.service';

@Controller('')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  /**
   * 판매글 생성
   */
  @Post('/deal/create')
  @Private('user')
  createDeal(@DUser() user: User, @Body() dealDto: DealDto) {
    return this.dealsService.createDeal(dealDto, user.id);
  }

  /**
   * 판매글 상세페이지
   */

  @Get('deal/:dealId')
  getDetailDeal(@Param('dealId') dealId: string) {
    console.log(111);
    const deal = this.dealsService.getDetailDeal(dealId);
    this.dealsService.updateView(dealId);
    return deal;
  }

  /**
   * 내가 쓴 글
   */

  @Get('my/deals/written')
  @Private('user')
  getMyWrote(@DUser() user: User) {
    return this.dealsService.getMyWrote(user.id);
  }

  /**
   * 내 글인지 확인
   */

  @Get('my/deals/:dealId')
  @Private('user')
  getIsMyDeal(@DUser() user: User, @Param('dealId') dealId: string) {
    const isMyDeal = this.dealsService.getIsMyDeal(user.id, dealId);
    return isMyDeal;
  }

  /**
   * 내가 좋아하는 글
   */

  @Get('/my/deals/likes')
  @Private('user')
  getMyLikes(@DUser() user: User) {
    return this.dealsService.getMyLikes(user.id);
  }

  /**
   * 최신글 불러오기
   */
  @Get('/deals')
  getDealsByLatest() {
    return this.dealsService.getDealsByLatest();
  }

  /**
   * 조회수 높은 순으로 불러오기
   */

  @Get('/deals/views')
  getDealsByViews() {
    return this.dealsService.getDealsByViews();
  }

  /**
   * 판매글 수정
   */

  @Patch('/deals/:dealId/edit')
  @Private('user')
  updateDeal(
    @DUser() user: User,
    @Param('dealId') dealId: string,
    @Body() dealDto: DealDto,
  ) {
    return this.dealsService.updateDeal(dealId, dealDto, user.id);
  }

  /**
   * 판매글 삭제
   */

  @Delete('/deals/:dealId/delete')
  @Private('user')
  deleteDeal(@DUser() user: User, @Param('dealId') dealId: string) {
    return this.dealsService.deleteDeal(dealId, user.id);
  }

  /**
   * 이미지 업로드
   */

  @Post('/deals/image')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.dealsService.uploadFile(file);
  }
}
