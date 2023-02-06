import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
export class UserEntity {
  @ApiProperty({
    format: 'uuid',
  })
  id: string; // uuid v4
  @ApiProperty({ example: 'TestUser' })
  login: string;
  @ApiProperty({ example: 1 })
  version: number; // integer number, increments on update
  @ApiProperty({ example: new Date().getTime() })
  createdAt: number; // timestamp of creation
  @ApiProperty({ example: new Date().getTime() })
  updatedAt: number; // timestamp of last update

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
