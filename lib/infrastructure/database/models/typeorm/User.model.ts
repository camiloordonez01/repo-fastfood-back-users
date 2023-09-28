import { Column, Entity, PrimaryGeneratedColumn,  } from 'typeorm'

@Entity('tbl_users')
class UserModel {
    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId?: number

    @Column()
    name: string

    @Column({ name: 'last_name' })
    lastName: string

    @Column()
    avatar?: string

    @Column()
    email: string

    @Column()
    username?: string

    @Column()
    password: string

    @Column({ name: 'active_row', default: '1' })
    activeRow?: number

    @Column({ name: 'created_at' })
    createdAt?: string

    @Column({ name: 'updated_at' })
    updatedAt?: string

    constructor(
        name: string,
        lastName: string,
        email: string,
        password: string,
        userId?: number,
        activeRow?: number,
        createdAt?: string,
        updatedAt?: string,
        username?: string
    ) {
        this.userId = userId
        this.name = name
        this.lastName = lastName
        this.email = email
        this.username = username
        this.password = password
        this.activeRow = activeRow
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

export default UserModel
