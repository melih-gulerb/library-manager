import UserBook, {UserBookProperties} from "../models/userbook"
import {BusinessError} from "../models/error";

export class UserBookRepository {
    async findByUserId(userId: number): Promise<UserBookProperties[]> {
        try {
            return await UserBook.findAll({
                attributes: [
                    'userId',
                    'bookId',
                    'state',
                    'userScore',
                ],
                where: {userId: userId, isActive: true},
            })
        } catch (err) {
            throw new BusinessError(String(err), 500)
        }
    }

    async findByBookId(bookId: number): Promise<UserBookProperties[]> {
        try {
            return await UserBook.findAll({
                attributes: [
                    'userScore'
                ],
                where: {bookId: bookId, isActive: true},
            })
        } catch (err) {
            throw new BusinessError(String(err), 500)
        }
    }

    async borrowUserBook(userbookProperties: UserBookProperties) {
        try {
            const userbook = await UserBook.findOne({where: { userId: userbookProperties.userId, bookId: userbookProperties.bookId }})
            if (userbook !== null && userbook.state == 1) {
                throw new BusinessError("This book is already borrowed from user", 400)
            } else if (userbook !== null && userbook.state == 0) {
                userbookProperties.state = 1
                await UserBook.update(userbookProperties, { where: { userId: userbookProperties.userId, bookId: userbookProperties.bookId }, fields: ['state']})
            } else {
                await UserBook.create(userbookProperties, { fields: ['userId', 'bookId','state'] })
            }
        }
        catch (err) {
            throw new BusinessError(String(err), 500)
        }
    }

    async returnBook(userbookProperties: UserBookProperties) {
        try {
            const userbook = await UserBook.findOne({where: { userId: userbookProperties.userId, bookId: userbookProperties.bookId }})
            if (userbook !== null && userbook.isActive) {
                await UserBook.update(userbookProperties, { where: { userId: userbookProperties.userId, bookId: userbookProperties.bookId }, fields: ['userScore', 'state']})
            } else if (userbook !== null && userbook.state === 0) {
                throw new BusinessError("Userbook is obtained but its already returned", 500)
            } else {
                throw new BusinessError("Userbook cannot found", 500)
            }
        }
        catch (err) {
            throw new BusinessError(String(err), 500)
        }
    }
}