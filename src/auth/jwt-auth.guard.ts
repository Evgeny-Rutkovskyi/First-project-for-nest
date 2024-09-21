import { BadRequestException, CanActivate, ExecutionContext, Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try{
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if(bearer !== 'Bearer' && !token){
                throw new BadRequestException('Користувач не пройшов валідацію токена');
            }
            const user = this.jwtService.verify(token);
            req.user = user;
            return true;
        } catch (e) {
            console.log('JwtGuard -', e);
            throw new InternalServerErrorException('Server error');
        }
    }
}