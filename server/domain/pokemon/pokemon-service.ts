import { Pokemon } from './types'

export interface PokemonService {
  findAll: () => Promise<Pokemon[]>
  findByName: (name: string) => Promise<Pokemon | null>
}
