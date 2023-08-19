import { getPokemons } from '../infrastructure/remoting/HttpPokemonApi'
import { BasicPokemon } from '../types'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export default async function findAllPokemonsUseCase(): Promise<BasicPokemon[]> {
  return await getPokemons()
}
