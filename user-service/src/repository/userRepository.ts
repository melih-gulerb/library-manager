import User, {UserProperties} from "../models/user"
import {FindUserProperties} from "../models/repository/userRepositoryModel"
import {BusinessError} from "../models/error";

export class UserRepository {
    async findById(id: number): Promise<UserProperties | null> {
        try {
            return await User.findOne({attributes: ['id', 'name'], where: {id: id}})
        }
        catch (err){
            throw new BusinessError(String(err), 500)
        }
    }

    async findAll(): Promise<FindUserProperties[]> {
        try {
            return await User.findAll({
                attributes: ['id', 'name'],
                where: {
                    isActive: true
                }
            }) as FindUserProperties[]
        } catch (err) {
            throw new BusinessError(String(err), 500)
        }
    }


    async create(userProperties: UserProperties): Promise<void> {
        try {
            await User.create(userProperties, { fields: ['name'] })
        }
        catch (err) {
            throw new BusinessError(String(err), 500)
        }
    }
}
