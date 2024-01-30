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
} from '@nestjs/common';
import { GuestService } from './guest.service';
import { Guest } from './guest.model';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestsService: GuestService) {}

  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAllByIdInvitation(@Query() query): Promise<Guest[]> {
    return this.guestsService.findAllByIdInvitation(query);
  }

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
