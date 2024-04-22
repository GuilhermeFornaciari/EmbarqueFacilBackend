import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Post,
} from '@nestjs/common';
import EnterpriseMongooseRepository from '../../../repository/mongodb/repositories/EnterpriseMongooseRepository';
import UserMongooseRepository from '../../../repository/mongodb/repositories/UserMongooseRepository';

import UsecaseGetAllEnterprise from '../../../../application/usecase/enterprise/getAllEnterprise.usecase';
import UsecaseGetOneEnterprise from '../../../../application/usecase/enterprise/getOneEnterprise.usecase';
import UsecaseDeleteEnterprise from '../../../../application/usecase/enterprise/deleteEnterprise.usecase';
import UsecaseUpdateEnterprise from '../../../../application/usecase/enterprise/updateEnterprise.usecase';
import UsecaseCreateEnterprise from '../../../../application/usecase/enterprise/createEnterprise.usecase';

import { Input as CreateInput } from '../../../../application/usecase/enterprise/createEnterprise.usecase';
import { Input as UpdateInput } from '../../../../application/usecase/enterprise/updateEnterprise.usecase';

@Controller('enterprise')
export default class EnterpriseController {
  constructor(
    readonly EnterpriseRepo: EnterpriseMongooseRepository,
    readonly UserRepo: UserMongooseRepository,
  ) {}

  @Post()
  async create(@Body() createInput: CreateInput) {
    const usecase = new UsecaseCreateEnterprise(
      this.EnterpriseRepo,
      this.UserRepo,
    );
    return await usecase.execute(createInput);
  }
  @Get()
  async findAll() {
    const usecase = new UsecaseGetAllEnterprise(this.EnterpriseRepo);
    return await usecase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const usecase = new UsecaseGetOneEnterprise(this.EnterpriseRepo);
    const data = await usecase.execute(id);
    console.log(data);

    return data;
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: UpdateInput) {
    const usecase = new UsecaseUpdateEnterprise(this.EnterpriseRepo);
    return await usecase.execute(updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const usecase = new UsecaseDeleteEnterprise(this.EnterpriseRepo);
    return await usecase.execute(id);
  }
}
