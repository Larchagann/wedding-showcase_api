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

  //Pour front admin
  async findAll(): Promise<Invitation[]> {
    const options: FindManyOptions= {
      relations: ['guest', 'dish']
    }
    return this.invitations.find(options);
  }

  async createInvitation(invitationData: Invitation): Promise<any> {
    const invitation = this.invitations.create(invitationData);
    return this.invitations.save(invitation);
  }

  async deleteInvitation(idInvitation: number): Promise<void> {
    const options: FindManyOptions = {
      where: { idInvitation: idInvitation },
    };
    const invitation = await this.invitations.find(options);

    if (!invitation) {
      throw new NotFoundException(
        `Aucune invitation avec l'id ${idInvitation} trouvée.`,
      );
    }
    await this.invitations.delete(idInvitation);
  }

  //Pour front public
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

  //Pour les deux 
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
