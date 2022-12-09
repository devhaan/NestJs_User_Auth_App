import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { LoginDto } from './dto/LoginDto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return "demo"
    // const userData = await this.findOne(createUserDto.email);
    // if (userData.length > 0) {
    //   return 'Already exist';
    // }
    // const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    // const user = {
    //   name: createUserDto.name,
    //   email: createUserDto.email,
    //   password: hashedPassword,
    // };
    // const createdUser = new this.userModel(user);
    // return createdUser;
    // createdUser.save();
    // delete user.password;

    // return user;
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(email: string) {
    return this.userModel.find({ email: email }).exec();
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ email: email }, updateUserDto);
  }

  remove(email: string) {
    return this.userModel.findOneAndRemove({ email: email });
  }
  async login(loginDto: LoginDto) {
    const userData = await this.findOne(loginDto.email);
    return 'hh';
    if (userData.length == 0) {
      return 'Invalid User';
    } else return 'hello';
    return userData;
    // if (!(await bcrypt.compare(loginDto.password, userData.password))) {
    //   return 'Invalid Credential';
    // }

    //const jwt = await this.jwtService.signAsync({ id: userData.id });

    //response.cookie('jwt', jwt, { httpOnly: true });

    // return jwt;
  }
}
