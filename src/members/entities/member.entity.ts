import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsString } from 'class-validator';
import { BaseTimeEntity } from '../../common/entities/base-time.entity';

@Entity()
export class Member extends BaseTimeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  password: string;

  @Column({ default: null, nullable: true })
  @IsString()
  profileImg: string;
}