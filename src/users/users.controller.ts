/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Body,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from '../schema/users.schema';
import {
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiOperation,
} from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiQuery({
    name: 'id',
    required: false,
    schema: {
      default: 'ALL', // Set default value to 'ALL'
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Get Users successfully',
  })
  @ApiOperation({ summary: 'Get all users or user by id from this api' })
  async findAllUsers(@Query('id') id?: string): Promise<User[]> {
    try {
      let data: User[] | null;
      if (id.toUpperCase() === 'ALL') {
        data = await this.userService.findAll();
      } else {
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
          example: 'user@gmail.com',
          description: 'this is unique email',
        },
        username: {
          type: 'string',
          example: 'user01',
          description: 'this is the username',
        },
        password: {
          type: 'string',
          example: 'password',
          description: 'this is password',
        },
        firstName: {
          type: 'string',
          example: 'firstname',
          description: 'this is the name',
        },
        lastName: {
          type: 'string',
          example: 'lastname',
          description: 'this is the name',
        },
        phone: {
          type: 'string',
          example: '08xxxxxxxxx',
          description: 'this is the phone',
        },
        totalMoney: {
          type: 'number',
          example: 0,
          description: 'this is the total money',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User was created successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden',
  })
  @ApiOperation({ summary: 'Create new user from this api' })
  async createUser(@Body() user: User): Promise<User> {
    try {
      return await this.userService.create(user);
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
          example: 'user@gmail.com',
          description: 'this is unique email',
        },
        username: {
          type: 'string',
          example: 'user01',
          description: 'this is the username',
        },
        password: {
          type: 'string',
          example: 'password',
          description: 'this is password',
        },
        name: {
          type: 'string',
          example: 'user',
          description: 'this is the name',
        },
        phone: {
          type: 'string',
          example: '08xxxxxxxxx',
          description: 'this is the phone',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User was updated successfully',
  })
  @ApiOperation({ summary: 'Update user from this api' })
  async updateUser(
    @Query('id') id: string,
    @Body() updatedUserData: Partial<User>,
  ): Promise<User> {
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
    description: 'Delete User successfully',
  })
  @ApiOperation({ summary: 'delete user from this api' })
  async deleteUser(@Query('id') id: string): Promise<string> {
    try {
      return await this.userService.delete(id);
    } catch (error) {
      return error;
    }
  }
  @Get('login')
  @ApiQuery({
    name: 'username',
    required: true,
    schema: {
      type: 'string',
      example: 'user01',
    },
  })
  @ApiQuery({
    name: 'password',
    required: true,
    schema: {
      type: 'string',
      example: 'password',
    },
  })
  @ApiOperation({ summary: 'login account user' })
  async login(
    @Query('username') username: string,
    @Query('password') password: string,
  ): Promise<User> {
    try {
      return await this.userService.login(username, password);
    } catch (error) {
      return error;
    }
  }
  @Get('balanceAccount')
  @ApiQuery({
    name: 'userId',
    required: true,
    schema: {
      type: 'string',
      example: '665dcbf114bc7da8c41eddf3',
    },
  })
  @ApiOperation({ summary: 'get money from user' })
  async getMoney(@Query('userId') id: string) {
    try {
      return await this.userService.getMoney(id);
    } catch (error) {
      return error;
    }
  }
}
