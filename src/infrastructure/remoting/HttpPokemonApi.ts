import { BasicPokemon, Pokemon } from '../../types'

const pokeApiV2BasePath = 'https://pokeapi.co/api/v2'

const getPokemons = async (): Promise<BasicPokemon[]> => {
  const response = await fetch(`${pokeApiV2BasePath}/pokemon?limit=151`)
  const { results } = await response.json()
  return results.map((poke: { name: string }) => ({ name: poke.name }))
}

const getPokemonByName = async (pokemonName: string): Promise<Pokemon | null> => {
  const response = await fetch(`${pokeApiV2BasePath}/pokemon/${pokemonName}`)

  if (response.ok) {
    const json: {
      id: number
      name: string
      types: any[]
      sprites: any
    } = await response.json()

    const { id, name, types, sprites } = json
    return {
      id,
      name,
      types: types.map(t => t.type.name),
      imageUrl: sprites.other.dream_world.front_default
    }
  }

  return null
}

export {
  getPokemons,
  getPokemonByName
}
