import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _authService: AuthService, private _jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('No hay un token en la petición!');
        }

        try {
            const payload = await this._jwtService.verifyAsync<JwtPayload>(
                token, { secret: process.env.JWT_SEED }
            );
            const user = await this._authService.findUserById(payload.id);
            if (!user) throw new UnauthorizedException('El usuario no existe en la base de datos!');
            if (!user.isActive) throw new UnauthorizedException('El usuario no está activo!');
            request['user'] = user;
        } 
        catch (error) {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}