import {NextFunction, Request, Response} from 'express'
import {UserService} from '../services/userService'
import {BorrowBookRequest, ReturnBookRequest} from "../models/request/userRequest"
import {BusinessError} from "../models/error";

let userService = new UserService()

export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
    let request: BorrowBookRequest = {bookId: 0, userId: 0}
    try {
        request = {userId: parseInt(req.params.userId), bookId: parseInt(req.params.bookId)}
    } catch {
        next(new BusinessError('Argument parse exception, possible incorrect arguments: userId, bookId', 400))
    }

    try {
        await userService.borrowBook(request)

        return res.status(204).json()
    } catch (err) {
        next(err)
    }
}
export const returnBook = async (req: Request, res: Response, next: NextFunction) => {
    let request: ReturnBookRequest = {bookId: 0, userId: 0, score: 0}
    try {
        request = {
            userId: parseInt(req.params.userId),
            bookId: parseInt(req.params.bookId),
            score: parseInt(req.body.score)
        }
    } catch {
        next(new BusinessError('Argument parse exception, possible incorrect arguments: userId, bookId, score', 400))
    }

    try {
        await userService.returnBook(request)

        return res.status(204).json()
    } catch (err) {
        next(err)
    }
}