import {
    BookProperties,
    FindUserByIdResponseProperties,
    PastProperties,
    PresentProperties
} from '../models/service/userServiceModel'
import {UserBookRepository} from '../repository/userbookRepository'
import {UserRepository} from '../repository/userRepository'
import {State} from "../models/enums/borrowStateEnum"
import {FindUserProperties} from "../models/repository/userRepositoryModel"
import {CreateUserRequest} from "../models/request/userRequest"

const userbookRepository = new UserBookRepository()
const userRepository = new UserRepository()

export class UserService {
    async findUserById(id: string): Promise<FindUserByIdResponseProperties | null> {
        let user = await userRepository.findById(id)
        if (user === null) {
            return null
        }

        let book: BookProperties = { past: [], present: [] }
        let userbooks = await userbookRepository.findByUserId(id)
        if (userbooks.length > 0) {
            book.past = userbooks.filter(i => i.state == State.Past).map(i => {
                return {
                    userScore: i.userScore, name: i.bookName
                } as PastProperties
            })
            book.present = userbooks.filter(i => i.state == State.Present).map(i => {
                return {
                    name: i.bookName
                } as PresentProperties
            })
        }

        let userBook: FindUserByIdResponseProperties = {
            name: user.name,
            books: book
        }

        console.log(userBook)

        return userBook
    }

    async findAll(): Promise<FindUserProperties[]> {
        let users = await userRepository.findAll()
        console.log(users)

        return users
    }

    async createUser(request: CreateUserRequest): Promise<number> {

        const userId = await userRepository.create(request)
        console.log(userId)

        return userId
    }
}