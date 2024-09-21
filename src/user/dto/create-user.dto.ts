import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";


export class userDto{

    @ApiProperty({example: 'test@ukr.net', description: 'Email user'})
    @IsString({message: 'Повинен бути рядковим значенням'})
    @IsEmail({}, {message: 'Не коректний email'})
    readonly email: string;

    @ApiProperty({example: '123pass321', description: 'Password user'})
    @IsString({message: 'Повинен бути рядковим значенням'})
    @Length(6, 12, {message: 'Пароль повинен містити більше 6 символів, і менше 12 символів'})
    readonly password: string;

    @ApiProperty({example: '+3800993695504', description: 'Number user'})
    @IsString({message: 'Повинен бути рядковим значенням'})
    readonly number_fon: string
}