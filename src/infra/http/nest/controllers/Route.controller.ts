import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Post,
} from '@nestjs/common';
import RouteMemoryRepository from '../../../repository/memory/RouteMemoryRepository';
import UsecaseGetAllRoute from '../../../../application/usecase/route/getAllRoute.usecase';
import UsecaseGetOneRoute from '../../../../application/usecase/route/getOneRoute.usecase';
import UsecaseDeleteRoute from '../../../../application/usecase/route/deleteRoute.usecase';
import UsecaseUpdateRoute from '../../../../application/usecase/route/updateRoute.usecase';
import UsecaseCreateRoute from '../../../../application/usecase/route/createRoute.usecase';

import { Input as CreateInput } from '../../../../application/usecase/route/createRoute.usecase';
import { Input as UpdateInput } from '../../../../application/usecase/route/updateRoute.usecase';

@Controller('route')
export default class RouteController {
  constructor(readonly repo: RouteMemoryRepository) {}

  @Post()
  async create(@Body() createInput: CreateInput) {
    const usecase = new UsecaseCreateRoute(this.repo);
    return await usecase.execute(createInput);
  }
  @Get()
  async findAll() {
    const usecase = new UsecaseGetAllRoute(this.repo);
    return await usecase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const usecase = new UsecaseGetOneRoute(this.repo);
    return await usecase.execute(id);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: UpdateInput) {
    const usecase = new UsecaseUpdateRoute(this.repo);
    return await usecase.execute(updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const usecase = new UsecaseDeleteRoute(this.repo);
    return await usecase.execute(id);
  }
}
