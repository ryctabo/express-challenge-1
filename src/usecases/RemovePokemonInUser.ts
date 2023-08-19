import { getPokemonByName } from '../infrastructure/remoting/HttpPokemonApi'
import { getUserById, updateUser } from '../infrastructure/repositories/UserRepository'
import { User } from '../types'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export default async function removePokemonInUser(
  userId: string,
  pokemonName: string
): Promise<User | null> {
  const [user, pokemon] = await Promise.all([
    getUserById(userId),
    getPokemonByName(pokemonName)
  ])

  if (user !== null && pokemon !== null) {
    user.favorites = user.favorites.filter((poke) => poke.id !== pokemon.id)
    await updateUser(user)
    return user
  }

  return null
}
