import { OnlyPokemonName } from '@domain/pokemon/types'
import { pokemonService } from '@infra/providers/services'

export default async function FindAllPokemon(): Promise<OnlyPokemonName[]> {
  const listOfPokemon = await pokemonService.findAll()
  return listOfPokemon.map(({ name }) => ({ name }))
}
