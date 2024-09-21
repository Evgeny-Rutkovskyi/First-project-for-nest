import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDto } from 'src/user/dto/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @ApiOperation({summary: 'Вхід користувача(login)'})
    @ApiBody({type: userDto})
    @ApiResponse({status: 200, type: Object})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @Post('/login')
    login(@Body() dto: userDto){
        return this.authService.login(dto);
    }

    @ApiOperation({summary: 'Реєстрація користувача'})
    @ApiBody({type: userDto})
    @ApiResponse({status: 200, type: Object})
    @ApiResponse({status: 400, description: 'BadRequestException, User is created'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @Post('/registration')
    registration(@Body() dto: userDto){
        return this.authService.registration(dto);
    }
}
