import {BookRepository} from "../repository/bookRepository"
import {FindAllBooksResponse, FindBookByIdResponse} from "../models/response/bookResponse"
import {CreateBookRequest} from "../models/request/bookRequest"
import {BookProperties} from "../models/book"
import {BusinessError} from "../models/error";

const bookRepository = new BookRepository()

export class BookService {
    async findAllBooks(): Promise<FindAllBooksResponse[]> {
        const books = await bookRepository.findAllBooks()
        if (books.length === 0) {
            throw new BusinessError("Couldn't find any user", 404)
        }

        return books
    }

    async findBookById(id: number): Promise<FindBookByIdResponse> {
        let book = await bookRepository.findBookById(id)
        if (book === null) {
            throw new BusinessError("Couldn't find any user", 404)
        }

        return book
    }

    async createBook(request: CreateBookRequest): Promise<void> {
        let book: BookProperties = {
            name: request.name,
            id: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
            score: -1,
            isBorrowed: false
        }
        await bookRepository.createBook(book)
    }

    async updateAverageRatingByBookId(bookId: number, averageRating: number): Promise<void> {
        await bookRepository.updateAverageRatingByBookId(bookId, averageRating)
    }

    async updateBorrowStatusByBookId(bookId: number, isBorrowed: boolean): Promise<void> {
        await bookRepository.updateBorrowStatusByBookId(bookId, isBorrowed)
    }
}