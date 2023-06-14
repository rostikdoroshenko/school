import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from '../interfaces/create-user.interface';
import { AuthService } from '../auth.service';
import { Public } from '../constants';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  createUser(@Body() newUser: CreateUserDto) {
    return this.authService.createUser(newUser);
  }

  @Public()
  @HttpCode(200)
  @Post('login')
  login(@Body() user: CreateUserDto) {
    return this.authService.login(user);
  }
}
