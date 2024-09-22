import {NextFunction, Request, Response} from 'express'
import {BookService} from '../services/bookService'
import {BusinessError} from "../models/error";

let bookService = new BookService()

export const findAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let books = await bookService.findAllBooks()

        return res.status(200).json(books)
    } catch (err) {
        next(err)
    }
}

export const findBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let book = await bookService.findBookById(parseInt(req.params.id))

        return res.status(200).json(book)
    } catch (err) {
        next(err)
    }
}

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let request = req.body
        await bookService.createBook(request)

        return res.status(201).json()
    } catch (err) {
        next(err)
    }

}

export const updateAverageRatingByBookId = async (req: Request, res: Response, next: NextFunction) => {
    let bookId = 0
    let rating = 0
    try {
        bookId = parseInt(req.params.id)
        rating = parseFloat(req.query.rating as string)
    } catch {
        next(new BusinessError('Argument parse exception, possible incorrect arguments: id, rating', 400))
    }

    try {
        await bookService.updateAverageRatingByBookId(bookId, rating)
    } catch (err) {
        next(err)
    }

    return res.status(204).json()

}

export const updateBorrowStatusByBookId = async (req: Request, res: Response, next: NextFunction) => {
    let bookId = 0
    let isBorrowed = false
    try {
        bookId = parseInt(req.params.id)
        isBorrowed = req.query.isBorrowed === 'true'
    } catch {
        next(new BusinessError('Argument parse exception, possible incorrect arguments: id, rating', 400))
    }

    try {
        await bookService.updateBorrowStatusByBookId(bookId, isBorrowed)
    } catch (err) {
        next(err)
    }

    return res.status(204).json()
}