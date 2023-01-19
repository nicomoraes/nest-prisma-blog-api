import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly slug: string;

  @IsString()
  readonly content: string;

  @IsString()
  @IsNotEmpty()
  readonly coverLink: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsBoolean()
  @IsOptional()
  readonly featured: boolean;

  @IsInt({ each: true })
  readonly categories: number[];
}
