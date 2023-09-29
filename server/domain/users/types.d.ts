export interface User {
  id: string
  username: string
  email: string
  displayName: string
  password: string
  favorites: Pokemon[]
}

export type NewUser = Omit<User, 'id'>

export type UserWithoutSensitiveData = Omit<User, 'password'>
