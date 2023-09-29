import { Pokemon } from '@domain/pokemon/types'
import { pokemonService } from '@infra/providers/services'

export default async function FindPokemonByName(name: string): Promise<Pokemon | null> {
  return await pokemonService.findByName(name)
}
