/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Patch, Delete, Query, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './users.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findAllUsers(@Query('id') id?: string): Promise<User[]> {
        try {
            let data: User[] | null;
            if (id !== undefined) {
                const userData = await this.userService.findById(id);
                if (!userData) {
                    return [];
                }
                data = [userData]; // Wrap user in an array if necessary
            } else {
                data = await this.userService.findAll();

            }
            return data;
        } catch (error) {
            return [];
        }
    }

    @Post()
    async createUser(@Body() userData: Partial<User>): Promise<User> {
        try {
            const res = await this.userService.create(userData);
            return res;
        } catch (error) {
            return error;
        }
    }

    @Patch()
    async updateUser(@Query('id') id: string, @Body() updatedUserData: Partial<User>): Promise<User> {
        try {
            const user = await this.userService.update(id, updatedUserData);
            if (!user) {
                return;
            }
            return user;
        } catch (error) {
            return error;
        }
    }

    @Delete()
    async deleteUser(@Query('id') id: string): Promise<string> {
        try {
            return await this.userService.delete(id);

        } catch (error) {
            return error;
        }
    }
}
