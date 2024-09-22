import {FindAllBooksResponse, FindBookByIdResponse} from "../models/response/bookResponse"
import Book, {BookProperties} from "../models/book"
import {BusinessError} from "../models/error";

export class BookRepository {
    async findAllBooks(): Promise<FindAllBooksResponse[]> {
        try {
            const books = await Book.findAll({
                attributes: [
                    'id',
                    'name',
                ], where : { isActive: true }
            }) as FindAllBooksResponse[]
            console.log(books)

            return books
        } catch (err) {
            throw new BusinessError(String(err), 500)
        }
    }

    async findBookById(id: number): Promise<FindBookByIdResponse | null > {
        try {
            return await Book.findOne({
                attributes: [
                    'id',
                    'name',
                    'score',
                    'isBorrowed'
                ], where: {id: id}
            }) as FindBookByIdResponse
        } catch (err) {
            throw new BusinessError(String(err), 500)
        }
    }

    async updateAverageRatingByBookId(bookId: number, averageRating: number): Promise<void> {
        try {
            const book = await Book.findOne({
                attributes: [
                    'id',
                    'name',
                    'score',
                ], where : { id: bookId }
            }) as BookProperties

            if (book == null) {
                throw new BusinessError(`Couldn't find any book with id ${bookId}`, 404)
            }

            const updateData = { score: averageRating }
            await Book.update(updateData, { where: {id: bookId }, fields: ['score']})
        } catch (err) {
            throw new BusinessError(String(err), 500)
        }
    }

    async updateBorrowStatusByBookId(bookId: number, isBorrowed: boolean): Promise<void> {
        try {
            let book = await Book.findOne({ where : { id: bookId }
            })

            if (book === null) {
                throw new BusinessError(`Couldn't find any book with id ${bookId}`, 404)
            }

            const updateData = { isBorrowed: isBorrowed }

            await Book.update(updateData, { where: {id: bookId }, fields: ['isBorrowed']})

        } catch (err) {
            console.log(err)
        }
    }

    async createBook(bookProperties: BookProperties): Promise<void> {
        try {
            await Book.create(bookProperties, { fields: ['name'] })
        }
        catch (err) {
            throw new BusinessError(String(err), 500)
        }
    }
}