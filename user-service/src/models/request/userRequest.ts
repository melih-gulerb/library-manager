
export interface CreateUserRequest {
    name: string
}
export interface BorrowBookRequest {
    userId: number
    bookId: number
}
export interface ReturnBookRequest {
    userId: number
    bookId: number
    score: number
}