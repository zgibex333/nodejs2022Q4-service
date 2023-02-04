import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UserEntity } from './users.interface';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  find(): Promise<UserEntity[]> {
    return this.userService.findMany();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDTO: CreateUserDTO): Promise<UserEntity> {
    return this.userService.create(createUserDTO);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  changePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePassword: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return this.userService.change(id, updatePassword);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @HttpCode(204)
  deleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserEntity> {
    return this.userService.delete(id);
  }
}
