import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/create-role.dto';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

    constructor(private readonly roleService: RolesService) {}

    @ApiOperation({summary: 'Created role for user'})
    @ApiBearerAuth('Token')
    @ApiBody({type: RoleDto})
    @ApiResponse({status: 200, type: RoleDto})
    @ApiResponse({status: 409, description: 'ConflictException, this role is created'})
    @ApiResponse({status: 500, description: 'Server error'})
    @UseGuards(JwtGuard)
    @Roles('ADMIN')
    @Post()
    create(@Body() dto: RoleDto){
        const role = this.roleService.create(dto);
        return role;
    }

    @ApiOperation({summary: 'Gets the user role by ID'})
    @ApiBearerAuth('Token')
    @ApiParam({name: 'value', type: String, description: 'Role'})
    @ApiResponse({status: 200, type: RoleDto})
    @ApiResponse({status: 404, description: 'NotFoundException, this role does not exist'})
    @ApiResponse({status: 500, description: 'Server error'})
    @UseGuards(JwtGuard)
    @Get('/:value')
    getRoleByValue(@Param('value') value: string){
        const role = this.roleService.getRoleByValue(value);
        return role;
    }
}
