import { User } from '@domain/users/types'
import { userRepository } from '@infra/providers/repositories'
import { pokemonService } from '@infra/providers/services'

export default async function AddFavoritePokemon(
  userId: string,
  pokemonName: string
): Promise<User> {
  const [user, pokemon] = await Promise.all([
    userRepository.findById(userId),
    pokemonService.findByName(pokemonName)
  ])

  if (user !== null && pokemon !== null) {
    user.favorites.push(pokemon)
    await userRepository.update(user)
    return user
  }

  throw Error('User or Pokemon was not found!')
}
