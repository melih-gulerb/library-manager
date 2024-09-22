import { Request, Response } from 'express'
import { UserService } from '../services/userService'
import {CreateUserRequest} from "../models/request/userRequest"

let userService = new UserService()

export const findUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.findUserById(req.params.id)
        if (user) {
            return res.status(200).json(user)
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch {
        return res.status(500).json({ message: "" })
    }
}

export const findAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.findAll()
        if (users) {
            res.status(200).json(users)
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch {
        res.status(500).json({ message: "" })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const request: CreateUserRequest = req.body
        let userId = await userService.createUser(request)

        return res.json({"userId": userId })

    } catch {
        res.status(500).json({ message: "" })
    }
    return res.json({"userId": 0 })
}
