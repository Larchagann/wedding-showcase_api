import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationService } from 'src/invitation/invitation.service';
import { Invitation } from 'src/invitation/invitation.model';
import { InvitationModule } from 'src/invitation/invitation.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InvitationModule,
    TypeOrmModule.forFeature([Invitation]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, InvitationService],
  controllers: [AuthController],
})
export class AuthModule {}