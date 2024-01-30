import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationService } from 'src/invitation/invitation.service';
import { Invitation } from 'src/invitation/invitation.model';
import { InvitationModule } from 'src/invitation/invitation.module';

@Module({
  imports: [
    InvitationModule,
    TypeOrmModule.forFeature([Invitation]),
    JwtModule.register({
      global: true,
      secret: "1234567890",
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, InvitationService],
  controllers: [AuthController],
})
export class AuthModule {}