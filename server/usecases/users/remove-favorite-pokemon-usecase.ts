import { User } from '@domain/users/types'
import { userRepository } from '@infra/providers/repositories'
import { pokemonService } from '@infra/providers/services'

export default async function RemoveFavoritePokemon(
  userId: string,
  pokemonName: string
): Promise<User> {
  const [user, pokemon] = await Promise.all([
    userRepository.findById(userId),
    pokemonService.findByName(pokemonName)
  ])

  if (user !== null && pokemon !== null) {
    user.favorites = user.favorites.filter((poke) => poke.id !== pokemon.id)
    await userRepository.update(user)
    return user
  }

  throw Error('User or Pokemon was not found!')
}
