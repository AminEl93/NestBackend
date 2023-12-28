import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto, RegisterUserDto, LoginDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './interfaces/login-response';
import { User } from './entities/user.entity';

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

    // Generar un nuevo JWT y verificarlo
    @UseGuards(AuthGuard)
    @Get('check-token')
    checkToken(@Request() req: Request): LoginResponse {
        const user = req['user'] as User;
        return {
            user,
            token: this._authService.getJwtToken({ id: user._id })
        }
    }
}
