import { Controller, Body, Request, Post, UseGuards, Get } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/jwt.auth.guard';
import { LocalAuthGuard } from './guards/local.auth.guard';

interface ISignUp {
  password: string
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private  usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req) {
    return await this.authService.signIn(req.user)
  }

  @Post('signup')
  async create(@Body() signupReq: ISignUp) {
    const newUser =  await this.usersService.create(signupReq);

    return {
      id: newUser['_id'],
      token: (await this.authService.signIn(newUser['_id'])).token
    }
  }

  @UseGuards(JWTAuthGuard)
  @Get("user")
  async getProfile(@Request() req){
    return req.user;
  }
}