import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth-admin')
export class AuthAdminController {
  constructor(private authAdminService: AuthAdminService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseInterceptors(FileInterceptor('file'))
  signIn(@Body() signInDto) {
    return this.authAdminService.signIn(signInDto.login, signInDto.password);
  }
}
