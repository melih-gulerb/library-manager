import {NextFunction, Request, Response} from 'express'
import {UserService} from '../services/userService'
import {CreateUserRequest} from "../models/request/userRequest"
import {BusinessError} from "../models/error";

let userService = new UserService()

export const findUserById = async (req: Request, res: Response, next: NextFunction) => {
    let id = 0
    try {
        id = parseInt(req.params.id)
    } catch {
        next(new BusinessError('Argument parse exception, possible incorrect arguments: id', 400))
    }

    try {
        const user = await userService.findUserById(id)

        return res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

export const findAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.findAll()

        return res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    let request: CreateUserRequest = {name: ""}
    try {
        request = req.body
    } catch {
        next(new BusinessError('Argument parse exception, possible incorrect arguments: name', 400))
    }

    try {
        await userService.createUser(request)

        return res.status(201).json()
    } catch (err) {
        next(err)
    }
}