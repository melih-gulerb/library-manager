import axios from "axios"
import {GetBookDataResponse} from "../models/clients/bookClientModel"
import {BusinessError} from "../models/error";

const baseURL = 'http://localhost:4000'
export class BookClient {
    async GetBookData(bookId: number): Promise<GetBookDataResponse> {
        try {
            const response = await axios.get(`${baseURL}/books/${bookId}`)

            return response.data as GetBookDataResponse
        } catch (err) {
            throw new BusinessError(String(err), 400)
        }
    }
    async updateBookRating(bookId: number, averageRating: number): Promise<void> {
        try {
            await axios.post(`${baseURL}/books/${bookId}/rating?rating=${averageRating}`)
        } catch (err) {
            throw new BusinessError(String(err), 400)
        }
    }

    async changeBookStatus(bookId: number, isBorrowed: boolean): Promise<void> {
        try {
            await axios.post(`${baseURL}/books/${bookId}/borrow?isBorrowed=${isBorrowed}`)
        } catch (err) {
            throw new BusinessError(String(err), 400)
        }
    }
}