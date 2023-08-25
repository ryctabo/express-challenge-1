import { getPokemonByName } from '../infrastructure/remoting/HttpPokemonApi'
import { Pokemon } from '../types'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export default async function findPokemonByNameUseCase(name: string): Promise<Pokemon | null> {
  return await getPokemonByName(name)
}
