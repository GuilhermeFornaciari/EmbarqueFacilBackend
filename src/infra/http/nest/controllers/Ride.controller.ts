import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Post,
} from '@nestjs/common';
import RideMemoryRepository from '../../../repository/memory/RideMemoryRepository';
import UsecaseGetAllRide from '../../../../application/usecase/ride/getAllRide.usecase';
import UsecaseGetOneRide from '../../../../application/usecase/ride/getOneRide.usecase';
import UsecaseDeleteRide from '../../../../application/usecase/ride/deleteRide.usecase';
import UsecaseUpdateRide from '../../../../application/usecase/ride/updateRide.usecase';
import UsecaseCreateRide from '../../../../application/usecase/ride/createRide.usecase';

import { Input as CreateInput } from '../../../../application/usecase/ride/createRide.usecase';
import { Input as UpdateInput } from '../../../../application/usecase/ride/updateRide.usecase';

@Controller('ride')
export default class RideController {
  constructor(readonly repo: RideMemoryRepository) {}

  @Post()
  async create(@Body() createInput: CreateInput) {
    const usecase = new UsecaseCreateRide(this.repo);
    return await usecase.execute(createInput);
  }
  @Get()
  async findAll() {
    const usecase = new UsecaseGetAllRide(this.repo);
    return await usecase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const usecase = new UsecaseGetOneRide(this.repo);
    return await usecase.execute(id);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: UpdateInput) {
    const usecase = new UsecaseUpdateRide(this.repo);
    return await usecase.execute(updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const usecase = new UsecaseDeleteRide(this.repo);
    return await usecase.execute(id);
  }
}
