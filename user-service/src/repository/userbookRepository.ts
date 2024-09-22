import UserBookProperties from "../models/userbook"
import UserBook from "../models/userbook"

export class UserBookRepository {
    async findByUserId(userId: string): Promise<UserBookProperties[]> {
        try {
            const userbooks = await UserBook.findAll({
                attributes: [
                    'userId',
                    'bookId',
                    'state',
                    'userScore',
                    'bookName'
                ],
                where: {userId: userId},
            })
            console.log(userbooks)

            return userbooks
        } catch (err) {
            console.log(err)
        }
        return []
    }
}