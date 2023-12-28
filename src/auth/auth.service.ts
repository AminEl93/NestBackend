import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';

import { User } from './entities/user.entity';

import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private _userModel: Model<User>,
        private _jwtService: JwtService
    ) { }    

    // Crear un registro en la base de datos
    async create(createUserDto: CreateUserDto): Promise<User> {        
        try {            
            const { password, ...userData } = createUserDto;

            // Encriptar la contraseña
            const newUser = new this._userModel({
                password: bcryptjs.hashSync(password, 10),
                ...userData
            });            

            // Guardar el usuario
            await newUser.save();

            const { password:_, ...user } = newUser.toJSON();
            return user;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException(`${createUserDto.email} ya existe en la base de datos!`);
            }
            throw new InternalServerErrorException('Algo no ha ido bien, los datos contienen errores! :(');
        }
    }

    // Login del usuario --> Regresa el User (_id, name, email...) y el JWT
    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this._userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('Credenciales no válidas para este email');
        }      
        if (!bcryptjs.compareSync(password, user.password)) {
            throw new UnauthorizedException('Credenciales no válidas para este password');
        }      
        const { password:_, ...restData } = user.toJSON();
        return {
            user: restData,
            token: this.getJwtToken({ id: user.id })
        }
    }

    findAll() {
        return `This action returns all auth`;
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    update(id: number, updateAuthDto: UpdateAuthDto) {
        return `This action updates a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }

    // Generar el JWT (JSON Web Token) que será la llave de acceso
    getJwtToken(payload: JwtPayload) {
        const token = this._jwtService.sign(payload);
        return token;
    }
}
