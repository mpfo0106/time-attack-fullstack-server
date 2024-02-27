import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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
    return this.dealsService.createDeal({ ...dealDto, authorId: user.id });
  }

  /**
   * 판매글 상세페이지
   */

  @Get('deals/:dealId')
  getDetailDeal(@Param('dealId') dealId: string) {
    return this.dealsService.getDetailDeal(dealId);
  }

  /**
   * 내가 쓴 글
   */

  @Get('/my/deals/written')
  @Private('user')
  getMyWrote(@DUser() user: User) {
    return this.dealsService.getMyWrote(user.id);
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
    return this.dealsService.updateDeal(dealId, {
      ...dealDto,
      authorId: user.id,
    });
  }
}
