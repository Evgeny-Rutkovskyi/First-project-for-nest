import { Body, Controller, Delete, Get, Headers, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from 'src/book/book.model';
import { OrderUserBook } from './order-user-book.model';
import { User } from 'src/user/user.model';
import { OrderDetail } from './details-order.model';

@ApiTags('Order')
@Controller('order')
export class OrdersController {

    constructor(private readonly orderService: OrdersService) {}

    @ApiOperation({summary: 'Додати книгу в кошик за ID'})
    @ApiBearerAuth('Token')
    @ApiParam({name: 'idBook', type: Number, description: 'ID Book'})
    @ApiResponse({status: 200, type: Book})
    @ApiResponse({status: 404, description: 'NotFoundException, Not found this book'})
    @ApiResponse({status: 400, description: 'BadRequestException, do not valid token'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @Post('/by/:idBook')
    byBookWithId(@Param('idBook') idBook: number, @Headers('authorization') authHeader: string){
        return this.orderService.byBookWithId(idBook, authHeader);
    }

    @ApiOperation({summary: 'Повертає баланс бонусів користувача'})
    @ApiBearerAuth('Token')
    @ApiParam({name: 'idUser', type: Number, description: 'ID User'})
    @ApiResponse({status: 200, type: Object})
    @ApiResponse({status: 404, description: 'NotFoundException, Not found this user'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @Get('/bonus/:idUser')
    getBonusUser(@Param('idUser') idUser: number){
        return this.orderService.getBonusUser(idUser);
    }

    @ApiOperation({summary: 'Повертає всі книги з кошику, за id користувача'})
    @ApiBearerAuth('Token')
    @ApiParam({name: 'idUser', type: Number, description: 'ID User'})
    @ApiResponse({status: 200, type: OrderUserBook})
    @ApiResponse({status: 404, description: 'NotFoundException, Not found this user'})
    @ApiResponse({status: 404, description: 'NotFoundException, No order exist'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @Get('/basket/:idUser')
    getByBooksWithBasket(@Param('idUser') idUser: number){
        return this.orderService.getByBooksWithBasket(idUser);
    }

    @ApiOperation({summary: 'Видаляє книгу з кошика'})
    @ApiBearerAuth('Token')
    @ApiParam({name: 'idUser', type: Number, description: 'Id User'})
    @ApiBody({type: Number})
    @ApiResponse({status: 200, type: Book})
    @ApiResponse({status: 404, description: 'NotFoundException, Not user/book exist'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @Delete('/book/:idUser')
    deleteBookWithBasket(@Param('idUser') idUser: number, @Body('idBook') idBook: number){
        return this.orderService.deleteBookWithBasket(idUser, idBook);
    }

    @ApiOperation({summary: 'Видаляє всі книги з кошика'})
    @ApiBearerAuth('Token')
    @ApiParam({name: 'idUser', type: Number, description: 'Id User'})
    @ApiResponse({status: 200, type: User})
    @ApiResponse({status: 404, description: 'NotFoundException, Not user exist'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @Delete('/basket/:idUser')
    deleteAllBasketByIdUser(@Param('idUser') idUser: number){
        return this.deleteAllBasketByIdUser(idUser);
    }

    @ApiOperation({summary: 'Створює замовлення'})
    @ApiBearerAuth('Token')
    @ApiParam({name: 'idUser', type: Number, description: 'Id User'})
    @ApiResponse({status: 200, type: OrderDetail})
    @ApiResponse({status: 404, description: 'NotFoundException, Not order exist'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @Post('/create/order/:idUser')
    createOrderDetailByIdUser(@Param('idUser') idUser: number){
        return this.orderService.createOrderDetailByIdUser(idUser);
    }

    @ApiOperation({summary: 'Повертає деталі замовлення'})
    @ApiBearerAuth('Token')
    @ApiParam({name: 'idUser', type: Number, description: 'Id User'})
    @ApiResponse({status: 200, type: OrderDetail})
    @ApiResponse({status: 404, description: 'NotFoundException, Not order exist in this user'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @Get('/detail/:idUser')
    getOrderDetail(@Param('idUser') idUser: number){
        return this.orderService.getOrderDetailByIdUser(idUser);
    }

    @ApiOperation({summary: 'Працює з бонусами, видаляє замовлення, після успішного виконання'})
    @ApiBearerAuth('Token')
    @ApiParam({name: 'idUser', type: Number, description: 'Id User'})
    @ApiResponse({status: 200, type: OrderDetail})
    @ApiResponse({status: 404, description: 'NotFoundException, Not user exist'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @Delete('/success/:idUser')
    successOrderByUserId(@Param('idUser') idUser: number){
        return this.orderService.successOrderWithIdUser(idUser);
    }

    @ApiOperation({summary: 'Оперує із списуванням бонусів користувача'})
    @ApiBearerAuth('Token')
    @ApiParam({name: 'idUser', type: Number, description: 'Id User'})
    @ApiResponse({status: 200, type: OrderDetail})
    @ApiResponse({status: 404, description: 'NotFoundException, Not orders exist in this user'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @Post('/by/bonus/:idUser')
    byBookWithBonus(@Param('idUser') idUser: number){
        return this.orderService.byBookWithBonusByIdUser(idUser);
    }


}
