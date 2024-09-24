import { BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { userDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.model';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async login(dto: userDto){
        try{
            const user = await this.validateUser(dto);
            const token = await this.generateToken(user);
            await this.userService.updateTokenByIdUser(user.id, token.token);
            return token;
        } catch (e) {
            console.log('loginMethod -', e);
            throw new BadRequestException(`Користувач не пройшов валідацію - ${e}`);
        }
    }

    async registration(dto: userDto){
        try{
            const candidate = await this.userService.getUserByEmail(dto.email);
            if(candidate){
                throw new BadRequestException('Даний користувач вже наявний');
            }
            const hashPassword = await bcrypt.hash(dto.password, 8);
            const user = await this.userService.createUser({...dto, password: hashPassword});
            const createToken = await this.generateToken(user);
            await this.userService.saveTokenByIdUser(user.id, createToken.token);
            return createToken;
        } catch (e) {
            console.log('registrationMethod -', e);
            throw new ConflictException(`Користувач з даним емейлом вже створений - ${e}`);
        }
    }

     async generateToken(user: User){
        try{
            const payload = {email: user.email, id: user.id, role: user.roles};
            return {
                token: this.jwtService.sign(payload)
            }
        }catch (e) {
            console.log('generateTokenMethod -', e);
            throw new InternalServerErrorException('Server error');
        }
    }

    private async validateUser(user: userDto){
        try{
            const candidateUser = await this.userService.getUserByEmail(user.email);
            const passwordEquals = await bcrypt.compare(user.password, candidateUser.password);
            if(candidateUser && passwordEquals){
                return candidateUser;
            }
            throw new BadRequestException('Користувач не пройшов валідацію');
        }catch (e) {
            console.log('validateUserMethod -', e);
            throw new InternalServerErrorException('Server error');
        }
    }
}
