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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UserEntity } from './users.interface';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({ summary: 'Get all users', description: 'Gets all users' })
  @ApiOkResponse({ description: 'Successful operation', type: [UserEntity] })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  find(): Promise<UserEntity[]> {
    return this.userService.findMany();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Get single user by id',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  findOne(
    @Param('userId', new ParseUUIDPipe()) id: string,
  ): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Creates a new user' })
  @ApiCreatedResponse({
    description: 'The user has been created.',
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  create(@Body() createUserDTO: CreateUserDTO): Promise<UserEntity> {
    return this.userService.create(createUserDTO);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':userId')
  @ApiOperation({
    summary: "Update a user's password",
    description: "Updates a user's password by ID",
  })
  @ApiOkResponse({
    description: 'The user has been updated.',
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'OldPassowrd is wrong',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  changePassword(
    @Param('userId', new ParseUUIDPipe()) id: string,
    @Body() updatePassword: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return this.userService.change(id, updatePassword);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':userId')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes user by ID.',
  })
  @ApiNoContentResponse({
    description: 'The user has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  deleteUser(
    @Param('userId', new ParseUUIDPipe()) id: string,
  ): Promise<UserEntity> {
    return this.userService.delete(id);
  }
}
