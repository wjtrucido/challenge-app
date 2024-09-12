import { Type } from 'class-transformer';
import { IsInt, Min, Max } from 'class-validator';

export class PaginationParamsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 5;
}
