import { NewUser, User } from './types'

export interface UserRepository {
  findAll: () => Promise<User[]>
  findById: (id: string) => Promise<User | null>
  findByUsername: (username: string) => Promise<User | null>
  save: (user: NewUser) => Promise<User>
  update: (user: User) => Promise<boolean>
}
