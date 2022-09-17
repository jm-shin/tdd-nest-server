import { IsDefined, IsString } from 'class-validator';

export class RegisterPostDto {
  @IsDefined()
  @IsString()
  readonly author: string;

  @IsDefined()
  @IsString()
  readonly title: string;

  @IsDefined()
  @IsString()
  readonly content: string;
}