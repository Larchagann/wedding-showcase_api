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
import { InvitationService } from './invitation.service';
import { Invitation } from './invitation.model';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findOneByMail(@Query() query): Promise<Invitation> {
    return this.invitationService.findOneByMail(query);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  createInvitation(@Body() invitationData: Invitation): Promise<any> {
    return this.invitationService.createInvitation(invitationData);
  }

  @Delete(':id')
  async deleteInvitation(@Param('id') idInvitation: number) {
    await this.invitationService.deleteInvitation(idInvitation);
    return { message: 'Invitation supprimée avec succès !' };
  }

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
