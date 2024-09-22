import express from 'express'
import {
    createBook,
    findAllBooks,
    findBookById,
    updateAverageRatingByBookId, updateBorrowStatusByBookId,
} from '../controllers/bookController'

const router = express.Router()

router.get('/books', findAllBooks)
router.get('/books/:id', findBookById)
router.post('/books', createBook)
router.post('/books/:id/rating', updateAverageRatingByBookId)
router.post('/books/:id/borrow', updateBorrowStatusByBookId)

export default router
