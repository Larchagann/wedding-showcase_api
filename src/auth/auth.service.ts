import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InvitationService } from 'src/invitation/invitation.service';

@Injectable()
export class AuthService {
  constructor(
    private invitationService: InvitationService,
    private jwtService: JwtService,
  ) {}

  async signIn(mailAddress: string): Promise<any> {
    const invitation = await this.invitationService.findOne(mailAddress);

    const payload = { sub: invitation.idInvitation, email: invitation.mailAddress };
    return {
      access_token: await this.jwtService.signAsync(payload),
      invitation: invitation,
    };
  }
}