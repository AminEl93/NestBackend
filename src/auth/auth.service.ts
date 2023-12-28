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

import { CreateUserDto, RegisterUserDto, LoginDto, UpdateAuthDto } from './dto';

import { User } from './entities/user.entity';

import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private _userModel: Model<User>,
        private _jwtService: JwtService
    ) { }    

    // Crear un usuario (documento o registro) en la base de datos
    async create(createUserDto: CreateUserDto): Promise<User> {        
        try {            
            const { password, ...userData } = createUserDto;

            // Crear un usuario y encriptar la contraseña
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

    // Registrar un usuario en la base de datos
    async register(registerDto: RegisterUserDto): Promise<LoginResponse> {
        const user = await this.create(registerDto);    
        return {
            user: user,
            token: this.getJwtToken({ id: user._id })
        }
    }

    // Login de un usuario --> Regresa el User (_id, name, email...) y el JWT
    async login(loginDto: LoginDto): Promise<LoginResponse>  {
        const { email, password } = loginDto;
        const user = await this._userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('Este email no existe en la base de datos, prueba otro válido!');
        }      
        if (!bcryptjs.compareSync(password, user.password)) {
            throw new UnauthorizedException('Esta contraseña no existe en la base de datos, prueba otra válida!');
        }      
        const { password:_, ...restData } = user.toJSON();
        return {
            user: restData,
            token: this.getJwtToken({ id: user.id })
        }
    }

    // Obtener todos los usuarios
    findAll(): Promise<User[]> {
        return this._userModel.find();
    }

    // Obtener un usuario por su ID
    async findUserById(userId: string) {
        const user = await this._userModel.findById(userId);
        const { password, ...restData } = user.toJSON();
        return restData;
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
