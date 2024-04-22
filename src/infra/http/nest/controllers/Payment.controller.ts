import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Post,
} from '@nestjs/common';
import PaymentMemoryRepository from '../../../repository/memory/PaymentMemoryRepository';
import UsecaseGetAllPayment from '../../../../application/usecase/payment/getAllPayment.usecase';
import UsecaseGetOnePayment from '../../../../application/usecase/payment/getOnePayment.usecase';
import UsecaseDeletePayment from '../../../../application/usecase/payment/deletePayment.usecase';
import UsecaseUpdatePayment from '../../../../application/usecase/payment/updatePayment.usecase';
import UsecaseCreatePayment from '../../../../application/usecase/payment/createPayment.usecase';

import { Input as CreateInput } from '../../../../application/usecase/payment/createPayment.usecase';
import { Input as UpdateInput } from '../../../../application/usecase/payment/updatePayment.usecase';

@Controller('payment')
export default class PaymentController {
  constructor(readonly repo: PaymentMemoryRepository) {}

  @Post()
  async create(@Body() createInput: CreateInput) {
    const usecase = new UsecaseCreatePayment(this.repo);
    return await usecase.execute(createInput);
  }
  @Get()
  async findAll() {
    const usecase = new UsecaseGetAllPayment(this.repo);
    return await usecase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const usecase = new UsecaseGetOnePayment(this.repo);
    return await usecase.execute(id);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: UpdateInput) {
    const usecase = new UsecaseUpdatePayment(this.repo);
    return await usecase.execute(updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const usecase = new UsecaseDeletePayment(this.repo);
    return await usecase.execute(id);
  }
}
