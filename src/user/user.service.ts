import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs'
import { User } from './user.model';
import { userDto } from './dto/create-user.dto';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { Token } from './token.model';
import { AddRole } from './dto/roles-admin.dto';
import { UpdateDto } from './dto/update.dto';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private readonly roleService: RolesService,
                @InjectModel(Token) private tokenRepository: typeof Token) {}

    async createUser(dto: userDto){
        try{
            const [user, created] = await this.userRepository.findOrCreate({
                where: {email: dto.email},
                defaults: {...dto}
            });
            if(!created ){
                throw new ConflictException('Користувач з даним емейлом вже створений');
            }
            const role = await this.roleService.getRoleByValue('USER')//
            await user.$set('roles', [role.id]);
            const user_role = await this.userRepository.findOne({
                where: {email: user.email},
                include:{model: Role}});
            return user_role;
        }catch (e){
            console.log('CreateUserMethod -', e);
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async getAllUser(){
        try{
            const allUsers = await this.userRepository.findAll({
                include:[
                    {model: Role},
                ]});
            return allUsers;
        }catch(e){
            console.log('getAllUserMethod -', e);
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    
    async getUserById(idUser: number){
        try {
            const user = await this.userRepository.findByPk(idUser);
            if(!user){
                throw new ConflictException('Користувача з таким емейлом вже існує');
            }
            return user;
        } catch (e) {
            console.log('getUserByIdMethod -', e);
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async updateEmailUserById(idUser: number, dto: UpdateDto){
        try {
            const isUser = await this.isValidateUser(idUser, dto);
            if(!isUser){
                throw new BadRequestException('Не вірно введений пароль');
            }
            const updateUser = await this.userRepository.update({email: dto.newEmail},
                {where: {id: idUser},
                returning: true}
            );
            return updateUser;
        } catch (e) {
            console.log('updateEmailUserByIdMethod -', e);
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    
    async updatePasswordUserById(idUser: number, dto: UpdateDto){
        try {    
            const isUser = await this.isValidateUser(idUser, dto);       
            if(!isUser){
                throw new BadRequestException('Не вірно введений пароль');
            }
            const updateUser = await this.userRepository.update({password: dto.newPassword},
                {where: {id: idUser}}
            );
            return updateUser;
        } catch (e) {
            console.log('updatePasswordUserByIdMethod -', e);
            throw new InternalServerErrorException('Internal Server Error');
        }
    }


    
    async deleteUserById(idUser: number){
        try {
            const deletedUser = await this.userRepository.findByPk(idUser);
            if(!idUser){
                throw new BadRequestException('Не існує такого користувача');
            }
            await deletedUser.destroy();
            return deletedUser;
        } catch (e) {
            console.log('deleteUserByIdMethod -', e);
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async getUserByEmail(email: string){
        try{
            const user = await this.userRepository.findOne({where: {email}, include: [{model: Role}]});
            return user;
        }catch(e){
            console.log('getUserByEmailMethod -', e);
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async saveTokenByIdUser(id: number, token: string){
        try{
            await this.tokenRepository.create({token, id_user: id});
        }catch(e){
            console.log('saveTokenByIdUserMethod -', e);
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async updateTokenByIdUser(id:number, newToken: string){
        try{
            const userToken = await this.tokenRepository.findOne({where: {id_user: id}});
            userToken.token = newToken;
            await userToken.save();
        }catch(e){
            console.log('updateTokenByIdUserMethod -', e);
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    
    async addRole(dto: AddRole){
        try{
            const user = await this.userRepository.findByPk(dto.id_user);
            const role = await this.roleService.getRoleByValue(dto.value);
            if(!user || !role){
                throw new NotFoundException('Не знайдено роль або користувача');
            }
            await user.$add('roles', role.id);
            return role;
        }catch (e){
            console.log('addRoleMethod -', e);
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    private async isValidateUser(idUser: number, dto: UpdateDto){
        try{
            const user = await this.userRepository.findByPk(idUser);
            if(!user){
                throw new NotFoundException('Не знайдено роль або користувача');
            }
            const isComparePassword = await bcrypt.compare(dto.password, user.password);
            return isComparePassword;
        }catch (e) {
            console.log('isValidateUserMethod -', e);
            throw new InternalServerErrorException('Internal Server Error');
        }
    }
}
