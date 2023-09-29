export interface UserDocument {
  username: string
  email: string
  displayName: string
  password: string
  favorites: PokemonDocWithId[]
}

export interface PokemonDocWithId extends PokemonDocument {
  id: string
}

export interface PokemonDocument {
  name: string
  types: string[]
  imageUrl: string
}
