import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { RoleDto } from './dto/create-role.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async create(dto: RoleDto){
        try{
            const [role, created] = await this.roleRepository.findOrCreate({
                where: {value: dto.value},
                defaults: {...dto}
            });

            if(!created){
                throw new ConflictException('Дана роль вже існує');
            }
            return role;
        } catch (e) {
            console.log('createMethod -', e);
            throw new InternalServerErrorException('Server error');
        }
    }

    async getRoleByValue(value: string){
        try{
            const role = await this.roleRepository.findOne({where: {value}});
            if(!role){
                throw new NotFoundException('Не існує даної ролі');
            }
            return role;
        } catch(e) {
            console.log('getRoleByValueMethod -', e);
            throw new InternalServerErrorException('Server error');
        }
    }
}
