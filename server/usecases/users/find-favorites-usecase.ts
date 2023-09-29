import { Pokemon } from '@domain/pokemon/types'
import { map } from '@domain/utils'
import { userRepository } from '@infra/providers/repositories'

export default async function FindFavoritesPokemonByUser(
  userId: string
): Promise<Pokemon[] | null> {
  const user = await userRepository.findById(userId)
  return map(user, ({ favorites }) => favorites)
}
