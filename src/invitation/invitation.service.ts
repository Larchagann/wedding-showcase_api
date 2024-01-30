import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Invitation } from './invitation.model';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation)
    public invitations: Repository<Invitation>,
  ) {}

  async findOne(mailAddress: string): Promise<Invitation | undefined> {
    const options: FindOneOptions = {
      where: { mailAddress: mailAddress },
    };
    const result = await this.invitations.findOne(options);
    return result;
  }

  async findOneByMail(@Query() query): Promise<Invitation> {
    const options: FindOneOptions = {
      where: { mailAddress: query.mailAddress },
    };
    const result = await this.invitations.findOne(options);
    return result;
  }

  async createInvitation(invitationData: Invitation): Promise<any> {
    const categorie = this.invitations.create(invitationData);
    return this.invitations.save(categorie);
  }

  async deleteInvitation(idInvitation: number): Promise<void> {
    const options: FindManyOptions = {
      where: { idInvitation: idInvitation },
    };
    const categorie = await this.invitations.find(options);

    if (!categorie) {
      throw new NotFoundException(
        `Aucune invitation avec l'id ${idInvitation} trouvée.`,
      );
    }
    await this.invitations.delete(idInvitation);
  }

  async updateInvitation(
    idInvitation: number,
    updatedInvitationData: Invitation,
  ): Promise<Invitation> {
    const options: FindOneOptions = {
      where: { idInvitation: idInvitation },
    };

    const invitation = await this.invitations.findOne(options);

    if (!invitation) {
      throw new NotFoundException(
        `Aucune invitation avec l'id ${idInvitation} trouvée.`,
      );
    }

    Object.assign(invitation, updatedInvitationData);

    const updatedInvitation = await this.invitations.save(invitation);
    return updatedInvitation;
  }
}
