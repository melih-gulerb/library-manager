import { BookProperties, FindUserByIdResponseProperties, PastProperties, PresentProperties} from '../models/service/userServiceModel'
import {UserBookRepository} from '../repository/userbookRepository'
import {UserRepository} from '../repository/userRepository'
import {State} from "../models/enums/borrowStateEnum"
import {FindUserProperties} from "../models/repository/userRepositoryModel"
import {BorrowBookRequest, CreateUserRequest, ReturnBookRequest} from "../models/request/userRequest"
import {UserBookProperties} from "../models/userbook"
import {UserProperties} from "../models/user"
import {BookClient} from "../clients/bookClient"
import {BusinessError} from "../models/error";

const userbookRepository = new UserBookRepository()
const userRepository = new UserRepository()
const bookClient = new BookClient()

export class UserService {
    async findUserById(id: number): Promise<FindUserByIdResponseProperties> {
        let user = await userRepository.findById(id)
        if (user === null) {
            throw new BusinessError("Couldn't find any user", 404)
        }

        let book: BookProperties = { past: [], present: [] }
        let userbooks = await userbookRepository.findByUserId(id)

        if (userbooks.length > 0) {
            for (const userbook of userbooks.filter(i => i.state == State.Past)) {
                const bookData = await bookClient.GetBookData(userbook.bookId)
                book.past.push({
                    userScore: userbook.userScore,
                    name: bookData.name
                } as PastProperties)
            }

            for (const userbook of userbooks.filter(i => i.state == State.Present)) {
                const bookData = await bookClient.GetBookData(userbook.bookId)
                book.present.push({
                    name: bookData.name
                } as PresentProperties)
            }
        }

        return {
            name: user.name,
            books: book
        }
    }

    async findAll(): Promise<FindUserProperties[]> {
        let users = await userRepository.findAll()
        if (users.length === 0 ){
            throw new BusinessError("Couldn't find any user", 404)
        }

        return users
    }

    async createUser(request: CreateUserRequest): Promise<void> {
        const user: UserProperties = {
            name: request.name,
            id: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
        }
        await userRepository.create(user)
    }

    async borrowBook(request: BorrowBookRequest): Promise<void> {
        const checkBook = await bookClient.GetBookData(request.bookId)
        if (checkBook == null) {
            throw new BusinessError(`Couldn't find any book for bookId ${request.bookId}`, 404)
        } else if (checkBook.isBorrowed) {
            throw new BusinessError(`Book is already borrowed by some other user ${request.bookId}`, 400)
        }

        const checkUser = await userRepository.findById(request.userId)
        if (checkUser == null) {
            throw new BusinessError(`Couldn't find any user for userId ${request.userId}`, 404)
        }

        const userbook: UserBookProperties = {
            userId: request.userId,
            bookId: request.bookId,
            id: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            userScore: -1,
            state: 1,
            isActive: true
        }

        await userbookRepository.borrowUserBook(userbook)
        await bookClient.changeBookStatus(request.bookId, true)
    }

    async returnBook(request: ReturnBookRequest): Promise<void> {
        const checkBook = await bookClient.GetBookData(request.bookId)
        if (checkBook == null) {
            throw new BusinessError(`Couldn't find any book for bookId ${request.bookId}`, 404)
        }
        const checkUser = await userRepository.findById(request.userId)
        if (checkUser == null) {
            throw new BusinessError(`Book is already borrowed by some other user ${request.bookId}`, 400)
        }

        const userbook: UserBookProperties = {
            userId: request.userId,
            bookId: request.bookId,
            id: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            userScore: request.score,
            state: 0,
            isActive: true
        }

        await userbookRepository.returnBook(userbook)

        let averageRating = 0
        const userbooksByBookId = await userbookRepository.findByBookId(request.bookId)

        if (userbooksByBookId.length > 0) {
            const totalScore = userbooksByBookId.reduce((sum, userbook) => sum + userbook.userScore, 0)

            averageRating = totalScore / userbooksByBookId.length
            averageRating = parseFloat(averageRating.toFixed(2))
        }

        await bookClient.updateBookRating(request.bookId, averageRating)
        await bookClient.changeBookStatus(request.bookId, false)
    }
}