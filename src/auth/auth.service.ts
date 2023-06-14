import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './interfaces/create-user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<{ message: string }> {
    const candidate = await this.userModel.findOne({ email: userDto.email });
    if (candidate) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'This email already exists',
        },
        HttpStatus.CONFLICT,
      );
    } else {
      if (userDto.email && userDto.password) {
        const password = await this.hashPassword(userDto.password);

        const newUser = new this.userModel({
          email: userDto.email,
          password: password,
        });
        console.log('newUser');
        await newUser.save();
        return {
          message: 'Created new user',
        };
      } else {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'No email or password',
          },
          HttpStatus.FORBIDDEN,
        );
      }
    }
  }

  async login(
    userDto: CreateUserDto,
  ): Promise<{ token: string; expiresIn: string }> {
    const candidate = await this.userModel.findOne({ email: userDto.email });

    if (candidate) {
      const isMatch = await bcrypt.compare(
        userDto.password,
        candidate.password,
      );
      if (isMatch) {
        return {
          token: 'Bearer ' + (await this.jwtService.signAsync({ candidate })),
          expiresIn: '3600',
        };
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Passwords are not the same',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No user with this email',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async validateUser(userEmail: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email: userEmail });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(password, salt);
  }
}
