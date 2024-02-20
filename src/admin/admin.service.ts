import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.model';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    public admins: Repository<Admin>,
  ) {}

  async findOne(login: string): Promise<Admin | undefined> {
    const options: FindOneOptions = {
      where: { login: login },
    };
    const result = await this.admins.findOne(options);
    return result;
  }
}
