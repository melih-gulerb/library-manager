import express from 'express'
import { findAllUsers, findUserById, createUser } from '../controllers/userController'
import {borrowBook, returnBook} from "../controllers/userbookController"

const router = express.Router()

router.get('/users', findAllUsers)
router.get('/users/:id', findUserById)
router.post('/users', createUser)

router.post('/users/:userId/borrow/:bookId', borrowBook)
router.post('/users/:userId/return/:bookId', returnBook)

export default router