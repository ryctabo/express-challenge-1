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

export interface AuthToken {
  token: string
}

export interface AuthRequest {
  username: string
  password: string
}

export interface Pokemon {
  id: number
  name: string
  types: string[]
  imageUrl: string
}

export type BasicPokemon = Pick<Pokemon, 'name'>
