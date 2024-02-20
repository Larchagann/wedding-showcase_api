import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admin/admin.model';
import { AdminModule } from 'src/admin/admin.module';
import { AuthAdminService } from './auth-admin.service';
import { AdminService } from 'src/admin/admin.service';
import { AuthAdminController } from './auth-admin.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminModule,
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY_ADMIN,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthAdminService, AdminService],
  controllers: [AuthAdminController],
})
export class AuthAdminModule {}
