import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@dto/user';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @Get()
    // findAll() {
    //     return this.userService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: number) {
    //     return this.userService.findById(+id);
    // }

    // @Put(':id')
    // update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    //     return this.userService.update(+id, updateUserDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.userService.remove(+id);
    // }
}
