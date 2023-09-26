import { Column, Entity, Unique, PrimaryGeneratedColumn } from 'typeorm'

@Entity('tbl_users')
class UserModel {
    @PrimaryGeneratedColumn({ name: 'id_user' })
    idUser: number

    @Column({ name: 'uid_user' })
    uidUser: string

    @Column()
    email: string

    @Column()
    username?: string

    @Column()
    password: string

    @Column()
    verified: number

    @Column({ name: 'person_id' })
    personId: number

    @Column({ name: 'active_row' })
    activeRow: number

    @Column({ name: 'created_at' })
    createdAt: string

    @Column({ name: 'updated_at' })
    updatedAt: string

    constructor(
        idUser: number,
        uidUser: string,
        email: string,
        password: string,
        verified: number,
        personId: number,
        activeRow: number,
        createdAt: string,
        updatedAt: string,
        username?: string
    ) {
        this.idUser = idUser
        this.uidUser = uidUser
        this.email = email
        this.username = username
        this.password = password
        this.verified = verified
        this.personId = personId
        this.activeRow = activeRow
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

export default UserModel
