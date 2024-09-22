import User, {UserProperties} from "../models/user"
import {FindUserProperties} from "../models/repository/userRepositoryModel"
import {Sequelize} from "sequelize"
import {CreateUserRequest} from "../models/request/userRequest";
export class UserRepository {
    async findById(id: string): Promise<UserProperties | null> {
        try {
            let user = await User.findOne({attributes: ['id', 'name'], where: {id: id}})
            console.log(user)

            return user
        }
        catch (err){
            console.log(err)
        }

        return null
    }

    async findAll(): Promise<FindUserProperties[]> {
        try {
            return await User.findAll({
                attributes: [[Sequelize.col('Id'), 'id'], [Sequelize.col('Name'), 'name']],
                where: {
                    isActive: true
                }
            }) as FindUserProperties[]
        } catch (err) {
            console.log(err)
        }

        return []
    }


    async create(userProperties: CreateUserRequest): Promise<number> {
        try {
            const userCreationData: UserProperties = {
                name: userProperties.name,
                id: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                isActive: true,
            }
            let user = await User.create(userCreationData, { fields: ['name'] })
            return user.id ?? 0
        }
        catch (err) {
            console.log(err)
        }

        return 0
    }
}
