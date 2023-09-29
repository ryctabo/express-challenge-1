export interface Pokemon {
  id: number
  name: string
  types: string[]
  imageUrl: string
}

export type OnlyPokemonName = Pick<Pokemon, 'name'>
