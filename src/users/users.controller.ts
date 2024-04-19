/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Patch, Delete, Query, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './users.schema';
import { ApiBody, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @ApiQuery({
        name: 'id', required: false, schema: {
            default: 'ALL' // Set default value to 'ALL'
        }
    })
    @ApiResponse({
        status: 200,
        description: 'Get Users successfully'
    })
    async findAllUsers(@Query('id') id?: string): Promise<User[]> {
        try {
            let data: User[] | null;
            if (id.toUpperCase() === "ALL") {
                data = await this.userService.findAll();
            }
            else {
                const userData = await this.userService.findById(id);
                if (!userData) {
                    return [];
                }
                data = [userData];
            }

            return data;
        } catch (error) {
            return [];
        }
    }

    @Post()
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: "user@gmail.com",
                    description: 'this is unique email',
                },
                username: {
                    type: 'string',
                    example: 'user01',
                    description: 'this is the username'
                },
                password: {
                    type: 'string',
                    example: "password",
                    description: 'this is password',
                },
                name: {
                    type: 'string',
                    example: 'user',
                    description: 'this is the name'
                },
                phone: {
                    type: 'string',
                    example: '08xxxxxxxxx',
                    description: 'this is the phone'
                }

            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'User was created successfully'
    })
    @ApiResponse({
        status: 403,
        description: 'Fobidden'
    })
    async createUser(@Body() userData: Partial<User>): Promise<User> {
        try {
            const res = await this.userService.create(userData);
            return res;
        } catch (error) {
            return error;
        }
    }

    @Patch()
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: "user@gmail.com",
                    description: 'this is unique email',
                },
                username: {
                    type: 'string',
                    example: 'user01',
                    description: 'this is the username'
                },
                password: {
                    type: 'string',
                    example: "password",
                    description: 'this is password',
                },
                name: {
                    type: 'string',
                    example: 'user',
                    description: 'this is the name'
                },
                phone: {
                    type: 'string',
                    example: '08xxxxxxxxx',
                    description: 'this is the phone'
                }

            }
        }
    })
    @ApiResponse({
        status: 200,
        description: 'User was updated successfully'
    })
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
    @ApiResponse({
        status: 201,
        description: 'Delete User successfully'
    })
    async deleteUser(@Query('id') id: string): Promise<string> {
        try {
            return await this.userService.delete(id);

        } catch (error) {
            return error;
        }
    }
}
