import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Post,
} from '@nestjs/common';
import UserMongooseRepository from '../../../repository/mongodb/repositories/UserMongooseRepository';

import UsecaseCreateUser from '../../../../application/usecase/user/createUser.usecase';
import UsecaseGetAllUser from '../../../../application/usecase/user/getAllUser.usecase';
import UsecaseGetOneUser from '../../../../application/usecase/user/getOneUser.usecase';
import UsecaseUpdateUser from '../../../../application/usecase/user/updateUser.usecase';
import UsecaseDeleteUser from '../../../../application/usecase/user/deleteUser.usecase';
import UsecaseLoginUser from '../../../../application/usecase/user/LoginUser.usecase';

import { Input as CreateInput } from '../../../../application/usecase/user/createUser.usecase';
import { Input as UpdateInput } from '../../../../application/usecase/user/updateUser.usecase';
import { Input as LoginInput } from '../../../../application/usecase/user/LoginUser.usecase';

@Controller('user')
export default class UserController {
  constructor(readonly repo: UserMongooseRepository) {}

  @Post()
  async create(@Body() createInput: CreateInput) {
    const usecase = new UsecaseCreateUser(this.repo);
    return await usecase.execute(createInput);
  }
  @Post('login')
  async login(@Body() loginInput: LoginInput) {
    const usecase = new UsecaseLoginUser(this.repo);
    return await usecase.execute(loginInput);
  }
  @Get()
  async findAll() {
    const usecase = new UsecaseGetAllUser(this.repo);
    return await usecase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const usecase = new UsecaseGetOneUser(this.repo);
    return await usecase.execute(id);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: UpdateInput) {
    const usecase = new UsecaseUpdateUser(this.repo);
    return await usecase.execute(updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const usecase = new UsecaseDeleteUser(this.repo);
    return await usecase.execute(id);
  }
}
