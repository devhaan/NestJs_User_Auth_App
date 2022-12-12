import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
  private logger = new Logger('UserServices');
  async create(createUserDto: CreateUserDto) {
    try {
      if (
        createUserDto['password'] != undefined &&
        createUserDto['confirmPassword'] != undefined &&
        createUserDto['password'] != createUserDto['confirmPassword']
      ) {
        throw new Error('Pass/ConFirm Pass must be same');
      }
      const userData = await this.findOne(createUserDto.email);
      if (userData.length > 0) {
        throw new Error('Already Register please Login');
      }
      const hashedPassword = await bcrypt.hash(createUserDto['password'], 12);

      const user = {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
      };
      const createdUser = new this.userModel(user);
      createdUser.save();
      delete user.password;

      return user;
    } catch (err) {
      this.logger.verbose(`breaking in /user/signup err ${err}`);
      return { error: err.message };
    }
  }

  findAll(): Promise<User[]> {
    return this.userModel.find({}, { name: 1, email: 1, _id: 0 }).exec();
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
  async login(loginDto: LoginDto, response) {
    try {
      const userData = await this.findOne(loginDto.email);
      if (userData.length == 0) {
        throw new Error('Invalid User/ Please SignUp first');
      }

      if (!(await bcrypt.compare(loginDto.password, userData[0].password))) {
        throw new Error('Invalid Credential');
      }

      const jwt = await this.jwtService.signAsync({ id: userData[0].id });

      response.cookie('jwt', jwt, { httpOnly: true });

      return { msg: 'Logged in' };
    } catch (err) {
      this.logger.verbose(`breaking in /user/login err ${err}`);
      return { error: err.message };
    }
  }

  logout(response) {
    try {
      response.clearCookie('jwt');
      return {
        message: 'Logged out',
      };
    } catch (err) {
      this.logger.verbose(`breaking in /user/logout err ${err}`);
      return { error: err.message };
    }
  }
}
