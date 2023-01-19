import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  readonly slug?: string;

  @IsString()
  readonly content?: string;

  @IsString()
  @IsNotEmpty()
  readonly coverLink?: string;

  @IsString()
  @IsNotEmpty()
  readonly description?: string;

  @IsBoolean()
  @IsOptional()
  readonly featured?: boolean;
}
