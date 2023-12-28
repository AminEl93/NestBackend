import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto, RegisterUserDto, LoginDto, UpdateAuthDto } from './dto';
import { AuthGuard } from './guards/auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this._authService.create(createUserDto);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this._authService.login(loginDto);
    }

    @Post('/register')
    register(@Body() registerDto: RegisterUserDto) {
        return this._authService.register(registerDto);
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Request() req: Request) {
        return this._authService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this._authService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
        return this._authService.update(+id, updateAuthDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this._authService.remove(+id);
    }
}
