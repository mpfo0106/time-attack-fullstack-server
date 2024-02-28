import { Length, Min, NotEquals } from 'class-validator';

export class DealDto {
  @Length(1, 30)
  title: string;
  @Length(5, 300)
  content: string;
  imgUrl: string;
  @Min(1000)
  price: number;
  @NotEquals('')
  region: string;
}
