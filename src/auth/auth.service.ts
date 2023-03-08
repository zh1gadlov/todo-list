import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(id: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (user && user.password === pass) {
      return { id: user.id };
    }
    return null;
  }

  async signIn(user: any) {
    const payload = { sub: user.id }
    return {
      token: this.jwtService.sign(payload)
    }
  }
}