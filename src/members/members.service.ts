import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async findByEmail(email: string) {
    return this.memberRepository.findOneBy({ email });
  }

  async create(member: Member) {
    const findUser = await this.findByEmail(member.email);

    if (findUser) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const nameFromEmail = member.email.split('@')[0];

    return this.memberRepository.save({
      ...member,
      name: member.name || nameFromEmail,
    });
  }
}
