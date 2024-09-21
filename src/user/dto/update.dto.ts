import { ApiProperty } from "@nestjs/swagger";

export class UpdateDto{
    @ApiProperty({example: 'test@ukr.net', description: 'Old email user'})
    readonly email: string;

    @ApiProperty({example: '123password321', description: 'Old user password'})
    readonly password: string;
    
    @ApiProperty({example: 'newEmail123@ukr.net', description: 'New user email'})
    readonly newEmail?: string;

    @ApiProperty({example: 'newPassword321', description: 'New user password'})
    readonly newPassword?: string
}