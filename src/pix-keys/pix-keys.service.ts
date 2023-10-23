import { Injectable } from '@nestjs/common';
import { CreatePixKeyDto } from './dto/create-pix-key.dto';
import {Repository} from 'typeorm';
import {PixKey} from "./entities/pix-key.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {BankAccount} from "../bank-accounts/entities/bank-account.entity";

@Injectable()
export class PixKeysService {

  constructor(
      @InjectRepository(PixKey) private pixKeyRepo: Repository<PixKey>,
      @InjectRepository(BankAccount) private bankAccountRepo: Repository<BankAccount>
  ) {}

  async create(bankAccountId: string, createPixKeyDto: CreatePixKeyDto) {
    await this.bankAccountRepo.findOneOrFail({ where: { id: bankAccountId } });

    // TODO: logica para consultar se a chave pix existe no banco central (grpc)

    return this.pixKeyRepo.save({
      bank_account_id: bankAccountId,
      ...createPixKeyDto
    });
  }

  findAll(bankAccountId: string) {
    return this.pixKeyRepo.find({
      where: {
        bank_account_id: bankAccountId,
      },
      order: {
        created_at: 'DESC'
      }
    })
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} pixKey`;
  // }

  // update(id: number, updatePixKeyDto: UpdatePixKeyDto) {
  //   return `This action updates a #${id} pixKey`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} pixKey`;
  // }
}
