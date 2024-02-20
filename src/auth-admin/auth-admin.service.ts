import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthAdminService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, password: string): Promise<any> {
    const admin = await this.adminService.findOne(login);
    if (admin?.password !== password) {
        throw new UnauthorizedException('Mot de passe incorrect');
      }
    const payload = { sub: admin.idAdmin, login: admin.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}