import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const signedUser = await this.userService.findOneByEmail(email);

    if (signedUser?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...user } = signedUser;

    const payload = { user };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }
}
