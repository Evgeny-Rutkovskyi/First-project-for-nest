import { Body, Controller, Get, Param, Patch, Post, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { userDto } from './dto/create-user.dto';
import { AddRole } from './dto/roles-admin.dto';
import { UpdateDto } from './dto/update.dto';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { RolesGuard } from 'src/auth/roles.guard';



@ApiTags('User')
@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService) {}

    
    @ApiOperation({summary: 'Повертає всіх користувачів'})
    @ApiResponse({status: 200, type: [User]})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @ApiBearerAuth('token')
    @UseGuards(JwtGuard)
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Get('/get')
    getAll(){
        return this.userService.getAllUser();
    }

    
    @ApiOperation({summary: 'Додає роль для користувача'})
    @ApiBearerAuth('token')
    @ApiBody({type: AddRole})
    @ApiResponse({status: 200, type: User})
    @ApiResponse({status: 404, description: 'NotFoundException, not found user/role'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Post('/add/role')
    addRole(@Body() dto: AddRole){
        return this.userService.addRole(dto);
    }

    
    @ApiOperation({summary: 'Повертає користувача за ID'})
    @ApiParam({name: 'id', type: String, description: 'ID user'})
    @ApiBearerAuth('token')
    @ApiResponse({status: 200, type: User})
    @ApiResponse({status: 409, description: 'ConflictException, this user is created'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @Get('/:id')
    getUserById(@Param('id') id: number){
        return this.userService.getUserById(id);
    }

    
    @ApiOperation({summary: 'Створює новий email for user'})
    @ApiBearerAuth('token')
    @ApiParam({name: 'id', type: String, description: 'ID user'})
    @ApiResponse({status: 200, type: User})
    @ApiResponse({status: 400, description: 'BadRequestException, do not valid password'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @Patch('/email/:id')
    updateEmailUser(@Param('id') id: number, @Body() dto: UpdateDto){
        return this.userService.updateEmailUserById(id, dto);
    }

    
    @ApiOperation({summary: 'Створює новий password for user'})
    @ApiBearerAuth('token')
    @ApiParam({name: 'id', type: String, description: 'ID user'})
    @ApiResponse({status: 200, type: User})
    @ApiResponse({status: 400, description: 'BadRequestException, do not valid password'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @Patch('/password/:id')
    updatePasswordUser(@Param('id') id: number, @Body() dto: UpdateDto){
        return this.userService.updatePasswordUserById(id, dto);
    }

    @ApiOperation({summary: 'Delete user by ID'})
    @ApiBearerAuth('token')
    @ApiParam({name: 'id', type: String, description: 'ID user'})
    @ApiResponse({status: 200, type: User})
    @ApiResponse({status: 400, description: 'BadRequestException, this user is not create'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @Delete('/:id')
    deleteUserById(@Param('id') id: number){
        return this.userService.deleteUserById(id);
    }
}
