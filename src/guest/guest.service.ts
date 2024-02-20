import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Guest } from './guest.model';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    public guests: Repository<Guest>,
  ) {}

  //Pour front admin
  async createGuest(guestData: Guest): Promise<any> {
    const guest = this.guests.create(guestData);
    return this.guests.save(guest);
  }

  async deleteGuest(idGuest: number): Promise<void> {
    const options: FindManyOptions = {
      where: {idGuest: idGuest}
    }
    const guest = await this.guests.find(options)

    if (!guest) {
      throw new NotFoundException(
        `Aucun invité avec l'id ${idGuest} trouvée.`
      )
    }
    await this.guests.delete(idGuest)
  }

  //Pour front public
  async findAllByIdInvitation(
    idInvitation: number,
  ): Promise<Guest[] | undefined> {
    const options: FindManyOptions = {
      where: { invitation: idInvitation },
    };
    const result = await this.guests.find(options);
    return result;
  }

  //Pour les deux
  async updateGuest(idGuest: number, updatedGuestData: Guest): Promise<Guest> {
    const options: FindOneOptions = {
      where: { idGuest: idGuest },
    };

    const guest = await this.guests.findOne(options);

    if (!guest) {
      throw new NotFoundException(`Aucun invité avec l'id ${idGuest} trouvée.`);
    }

    Object.assign(guest, updatedGuestData);

    const updatedGuest = await this.guests.save(guest);
    return updatedGuest;
  }
}
