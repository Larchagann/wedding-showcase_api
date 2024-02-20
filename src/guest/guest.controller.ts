import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Query,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GuestService } from './guest.service';
import { Guest } from './guest.model';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestsService: GuestService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('all')
  findAllByIdInvitation(@Query() query): Promise<Guest[]> {
    return this.guestsService.findAllByIdInvitation(query);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateGuest(
    @Param('id') idGuest: number,
    @Body() updatedGuestData: Guest,
  ): Promise<Guest> {
    return this.guestsService.updateGuest(
      idGuest,
      updatedGuestData,
    );
  }
}
