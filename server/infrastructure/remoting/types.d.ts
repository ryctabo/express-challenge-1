export interface PokemonResponse {
  id: number
  name: string
  types: Array<{ type: { name: string } }>
  sprites: any
}

export interface PokemonListResponse {
  results: PokemonResponse[]
}
