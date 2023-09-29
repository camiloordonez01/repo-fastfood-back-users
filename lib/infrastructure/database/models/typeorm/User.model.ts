import { Column, Entity, PrimaryGeneratedColumn,  } from 'typeorm'
import Model from '../../../../shared/infrastructure/database/Model'

@Entity('tbl_users')
class UserModel extends Model {
    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId?: number

    @Column()
    name: string

    @Column({ name: 'last_name' })
    lastName: string

    @Column()
    email: string

    @Column()
    username?: string

    @Column()
    password: string

    constructor(
        name: string,
        lastName: string,
        email: string,
        password: string,
        userId?: number,
        username?: string
    ) {
        super()
        this.userId = userId
        this.name = name
        this.lastName = lastName
        this.email = email
        this.username = username
        this.password = password
    }
}

export default UserModel
