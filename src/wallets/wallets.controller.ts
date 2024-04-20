/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { Wallet } from './wallets.schema';
import { WalletsService } from './wallets.service';
import { ApiBody, ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('Wallets')
@Controller('wallets')
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) { }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Get Users Sucessfully'
    })
    @ApiOperation({ summary: 'Get all wallets from this api' })
    async findAll(): Promise<Wallet[]> {
        try {
            return await this.walletsService.findAll();
        }
        catch (error) {
            return error;
        }
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'Get User Sucessfully'
    })
    @ApiOperation({ summary: 'Get wallet by id from this api' })
    async findById(@Param('id') id: string): Promise<Wallet | null> {
        try {
            return await this.walletsService.findById(id);
        }
        catch (error) {
            return error;
        }
    }

    @Post()
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: "Shopping Wallet",
                    description: 'this is unique email',
                },
                balance: {
                    type: 'number',
                    example: '20000000',
                    description: 'this is the username'
                },
                userId: {
                    type: 'string',
                    example: "661e6e17d9790c390ca10463",
                    description: 'this is password',
                }

            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'Wallet was created successfully'
    })
    @ApiOperation({ summary: 'Create new wallet from this api' })
    async create(@Body() walletDto: Partial<Wallet>): Promise<Wallet> {
        try {
            return await this.walletsService.create(walletDto);
        }
        catch (error) {
            return error;
        }
    }

    @Patch(':id')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: "Shopping Wallet",
                    description: 'this is unique email',
                },
                balance: {
                    type: 'number',
                    example: '20000000',
                    description: 'this is the username'
                },
                userId: {
                    type: 'string',
                    example: "661e6e17d9790c390ca10463",
                    description: 'this is password',
                }

            }
        }
    })
    @ApiResponse({
        status: 200,
        description: 'Wallet was updated successfully'
    })
    @ApiOperation({ summary: 'Update wallet from this api' })
    async update(@Param('id') id: string, @Body() updatedWalletDto: Partial<Wallet>): Promise<Wallet | null> {
        try {
            return await this.walletsService.update(id, updatedWalletDto);
        }
        catch (error) {
            return error;
        }
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'Wallet was deleted successfully'
    })
    @ApiOperation({ summary: 'Delete wallet from this api' })
    async delete(@Param('id') id: string): Promise<string> {
        try {
            return await this.walletsService.delete(id);
        }
        catch (error) {
            return error;
        }
    }
}
