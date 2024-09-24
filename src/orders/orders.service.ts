import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderDetail } from './details-order.model';
import { UserService } from 'src/user/user.service';
import { BookService } from 'src/book/book.service';
import { JwtService } from '@nestjs/jwt';
import { Book } from 'src/book/book.model';
import { OrderUserBook } from './order-user-book.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class OrdersService {

    constructor(
    private readonly bookService: BookService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectModel(OrderDetail) private orderDetailRepository: typeof OrderDetail,
    @InjectModel(OrderUserBook) private orderUserBookRepository: typeof OrderUserBook) {}

    async byBookWithId(idBook: number, authHeader: string){
        try {
            const book = await this.bookService.getBookById(idBook);
            if(!book){
                throw new NotFoundException('Не знайдено дану книжку');
            }
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if(!(bearer === 'Bearer') || !token){
                throw new BadRequestException('Токен не пройшов валідацію');
            }
            const payload = this.jwtService.decode(token);
            await book.$add('users', payload.id);
            return book;
        } catch (e) {
            console.log('byBookWithIdMethod -', e);
            throw new NotFoundException(`Не було знайдено дану книгу - ${e}`);
        }
    }

    async getBonusUser(idUser: number){
        try{
            const user = await this.userService.getUserById(idUser);
            if(!user){
                throw new NotFoundException('Не існує даного користувача');
            }
            return {bonus: user.bonus};
        }catch(e){
            console.log('getBonusUserMethod -', e);
            throw new ConflictException(`Користувача з таким емейлом не існує - ${e}`);
        }
    }



    async getByBooksWithBasket(idUser: number){
        try{
            const user = await this.userService.getUserById(idUser);
            if(!user){
                throw new NotFoundException('Не існує даного користувача');
            }
            const booksInBasket = await this.orderUserBookRepository.findAll({
                where: {id_user: idUser},
                include: {model: Book}
            })
            if(!booksInBasket){
                throw new NotFoundException('Не існує жодного замовлення');
            }
            return booksInBasket;
        }catch (e){
            console.log('getByBooksWithBasketMethod -', e);
            throw new ConflictException(`Користувача з таким емейлом не існує - ${e}`);
        }
    }


    async deleteBookWithBasket(idUser: number, idBook: number){
        try{
            const user = await this.userService.getUserById(idUser);
            const book = await this.bookService.getBookById(idBook);
            if(!book || !user){
                throw new NotFoundException('Не існує книги/користувача');
            }
            await this.orderUserBookRepository.destroy({where: {id_user: idUser,id_book: idBook}});
            return book;
        }catch (e) {
            console.log('deleteBookWithBasketMethod -', e);
            throw new ConflictException(`Користувача з таким емейлом не існує/не було знайдено такої книги в кошику - ${e}}`);
        }
    }

    async deleteAllBasketByIdUser(idUser: number){
        try {
            const user = await this.userService.getUserById(idUser);
            if(!user){
                throw new NotFoundException('Не існує даного користувача');
            }
            await this.orderUserBookRepository.destroy({where: {id_user: idUser}});
            return user;
        } catch (e) {
            console.log('deleteAllBasketByIdUserMethod -', e);
            throw new ConflictException(`Користувача з таким емейлом не існує - ${e}`);
        }
    }


    async createOrderDetailByIdUser(idUser: number){
        try {
            const bookInBasket = await this.getByBooksWithBasket(idUser);
            if(!bookInBasket){
                throw new NotFoundException('Корзина порожня, зробіть замовлення');
            }
            const allSum = bookInBasket.reduce((acc, el) => acc + el.bookOrder.price, 0);
            const qtyBooks = bookInBasket.length;
            const userBonus = await this.getBonusUser(idUser);
            const priceBySelf = await this.selfPrice(userBonus.bonus, allSum);
            const orderDetail = await this.orderDetailRepository.create({
                id_user: idUser,
                user_bonus: userBonus.bonus,
                order_sum: allSum,
                order_sum_self: priceBySelf.priceBySelf,
                number_of_books: qtyBooks
            });
            return orderDetail;
        } catch (e) {
            console.log('createOrderDetailByIdUserMethod -', e);
            throw new InternalServerErrorException('Server error');
        }
    }

    
    async successOrderWithIdUser(idUser: number){
        try {
            const orderUser = await this.getOrderDetailByIdUser(idUser);
            if(!orderUser){
                throw new NotFoundException('Не існує даного користувача');
            }
            const qtyBonus = orderUser.number_of_books;
            const user = await this.userService.getUserById(idUser);
            await user.update({bonus: Sequelize.literal(`bonus + ${qtyBonus * 100}`)},{where: {id: idUser}});
            await user.save();
            await orderUser.destroy();
            return orderUser;
        } catch (e) {
            console.log('successOrderWithIdUserMethod -', e);
            throw new NotFoundException(`Не існує жодного замовлення у даного користувача - ${e}`);
        }
    }

    async getOrderDetailByIdUser(idUser: number){
        try {
            const orderDetail = await this.orderDetailRepository.findOne({where: {id_user: idUser}});
            if(!orderDetail){
                throw new NotFoundException('Не існує жодного замовлення у даного користувача');
            }
            return orderDetail;
        } catch (e) {
            console.log('getOrderDetailByIdUserMethod -', e);
            throw new InternalServerErrorException('Server error');
        }
    }


    async byBookWithBonusByIdUser(idUser: number){
        try{
            const orderDetail = await this.getOrderDetailByIdUser(idUser);
            if(!orderDetail){
                throw new NotFoundException('Не існує жодного замовлення у даного користувача');
            }
            const bonusPrice = orderDetail.order_sum_self;
            orderDetail.order_sum = bonusPrice;
            orderDetail.user_bonus = 0;
            await orderDetail.save();
            const user = await this.userService.getUserById(idUser);
            await user.update({bonus: Sequelize.literal(`bonus - ${orderDetail.user_bonus}`)}, {where: {id: idUser}});
            return orderDetail;
        }catch(e){
            console.log('byBookWithBonusByIdUserMethod -', e);
            throw new NotFoundException(`Не існує жодного замовлення у даного користувача - ${e}`);
        }
    }

    private async selfPrice(bonus: number, allSum: number){
        if(allSum - bonus > 0){
            return {priceBySelf: allSum - bonus, remainderBonus: 0};
        }else{
            return {priceBySelf: 0, remainderBonus: bonus - allSum};
        }
    }
}
