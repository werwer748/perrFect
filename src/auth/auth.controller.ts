import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Member } from '../members/entities/member.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  register(
    @Body() body: Member
  ) {
    return this.authService.register(body);
  }
}
