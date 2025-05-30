import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateVolunteerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
