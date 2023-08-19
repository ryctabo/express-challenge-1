import { getUserById } from '../infrastructure/repositories/UserRepository'
import { Pokemon } from '../types'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export default async function findPokemonsByUserIdUseCase(
  userId: string
): Promise<Pokemon[] | null> {
  const user = await getUserById(userId)

  if (user !== null) {
    const { favorites } = user
    return favorites
  }

  return null
}
