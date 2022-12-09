import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/LoginDto';
import { Response, Request } from 'express';
import { Logger } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private logger = new Logger('UserController');
  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.verbose(`/user/signup hited for ${createUserDto.email}`);
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    this.logger.verbose(`/user for fetching all user records`);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.verbose(`/user for fetching unique user records for id ${id}`);
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.logger.verbose(`/user for patching ${id} record in data`);
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.verbose(`/user for deleting ${id} record from data`);
    return this.userService.remove(id);
  }
  @Post('/login')
  login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.logger.verbose(`/user/login authenticating user ${loginDto.email}`);
    return this.userService.login(loginDto, response);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    this.logger.verbose(`/user/logout deauthenticating`);
    return this.userService.logout(response);
  }
}
