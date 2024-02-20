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
import { InvitationService } from './invitation.service';
import { Invitation } from './invitation.model';
import { AuthAdminGuard } from 'src/auth-admin/auth-admin.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  // Pour front admin
  @Get('admin/all')
  @UseGuards(AuthAdminGuard)
  findAll(): Promise<Invitation[]> {
    return this.invitationService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthAdminGuard)
  @Post('/admin')
  createInvitation(@Body() invitationData: Invitation): Promise<any> {
    return this.invitationService.createInvitation(invitationData);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthAdminGuard)
  @Put('admin/:id')
  async updateInvitationAdmin(
    @Param('id') idInvitation: number,
    @Body() updatedInvitationData: Invitation,
  ): Promise<Invitation> {
    return this.invitationService.updateInvitation(
      idInvitation,
      updatedInvitationData,
    );
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthAdminGuard)
  @Delete('admin/:id')
  async deleteInvitation(@Param('id') idInvitation: number) {
    await this.invitationService.deleteInvitation(idInvitation);
    return { message: 'Invitation supprimée avec succès !' };
  }

  //Pour front public
  @HttpCode(HttpStatus.OK)
  @Get()
  findOneByMail(@Query() query): Promise<Invitation> {
    return this.invitationService.findOneByMail(query);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateInvitation(
    @Param('id') idInvitation: number,
    @Body() updatedInvitationData: Invitation,
  ): Promise<Invitation> {
    return this.invitationService.updateInvitation(
      idInvitation,
      updatedInvitationData,
    );
  }
}
