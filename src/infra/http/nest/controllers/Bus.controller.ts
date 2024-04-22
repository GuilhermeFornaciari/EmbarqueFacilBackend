import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Post,
} from '@nestjs/common';
import BusMongooseRepository from '../../../repository/mongodb/repositories/BusMongooseRepository';

import UsecaseGetAllBus from '../../../../application/usecase/bus/getAllBus.usecase';
import UsecaseGetOneBus from '../../../../application/usecase/bus/getOneBus.usecase';
import UsecaseDeleteBus from '../../../../application/usecase/bus/deleteBus.usecase';
import UsecaseUpdateBus from '../../../../application/usecase/bus/updateBus.usecase';
import UsecaseCreateBus from '../../../../application/usecase/bus/createBus.usecase';

import { Input as CreateInput } from '../../../../application/usecase/bus/createBus.usecase';
import { Input as UpdateInput } from '../../../../application/usecase/bus/updateBus.usecase';

@Controller('bus')
export default class BusController {
  constructor(readonly repo: BusMongooseRepository) {}

  @Post()
  async create(@Body() createInput: CreateInput) {
    const usecase = new UsecaseCreateBus(this.repo);
    return await usecase.execute(createInput);
  }
  @Get()
  async findAll() {
    const usecase = new UsecaseGetAllBus(this.repo);
    return await usecase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const usecase = new UsecaseGetOneBus(this.repo);
    return await usecase.execute(id);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: UpdateInput) {
    const usecase = new UsecaseUpdateBus(this.repo);
    return await usecase.execute(updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const usecase = new UsecaseDeleteBus(this.repo);
    return await usecase.execute(id);
  }
}
