import { Injectable } from '@nestjs/common';
import { MembersService } from '../members/members.service';
import { Member } from '../members/entities/member.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly membersService: MembersService,
  ) {}

  async register(member: Member) {
    return this.membersService.create(member);
  }
}
