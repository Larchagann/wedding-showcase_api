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
import { AuthAdminGuard } from 'src/auth-admin/auth-admin.guard';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestsService: GuestService) {}

  //Pour front admin
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthAdminGuard)
  @Post('admin')
  createGuest(@Body() guestData: Guest): Promise<any> {
    return this.guestsService.createGuest(guestData);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthAdminGuard)
  @Put('admin/:id')
  async updateGuestAdmin(
    @Param('id') idGuest: number,
    @Body() updatedGuestData: Guest,
  ): Promise<Guest> {
    return this.guestsService.updateGuest(idGuest, updatedGuestData);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthAdminGuard)
  @Delete('admin/:id')
  async deleteInvitation(@Param('id') idGuest: number) {
    await this.guestsService.deleteGuest(idGuest);
    return { message: 'Invité supprimée avec succès !' };
  }

  //Pour front public
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('all')
  findAllByIdInvitation(@Query() query): Promise<Guest[]> {
    return this.guestsService.findAllByIdInvitation(query);
  }

  //Pour les deux
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateGuest(
    @Param('id') idGuest: number,
    @Body() updatedGuestData: Guest,
  ): Promise<Guest> {
    return this.guestsService.updateGuest(idGuest, updatedGuestData);
  }
}
