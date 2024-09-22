import express from 'express'
import { findAllUsers, findUserById, createUser } from '../controllers/userController'

const router = express.Router()

router.get('/users', findAllUsers)
router.get('/users/:id', findUserById)
router.post('/users', createUser)

export default router
