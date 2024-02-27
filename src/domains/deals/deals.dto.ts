import { IsUrl, Length, Min, NotEquals } from 'class-validator';

export class DealDto {
  authorId: string;
  @Length(3, 30)
  title: string;
  @Length(10, 200)
  content: string;
  @IsUrl()
  imgUrl: string;
  @Min(1000)
  price: number;
  @NotEquals('')
  region: string;
}
