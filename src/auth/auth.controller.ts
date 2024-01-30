import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    UseInterceptors,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { FileInterceptor } from '@nestjs/platform-express';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseInterceptors(FileInterceptor('file'))
    signIn(@Body() signInDto) {
      return this.authService.signIn(signInDto.mailAddress);
    }
  }