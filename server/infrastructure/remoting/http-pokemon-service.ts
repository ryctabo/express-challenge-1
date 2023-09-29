import { PokemonService } from '@domain/pokemon/pokemon-service'
import { Pokemon } from '@domain/pokemon/types'
import { PokemonListResponse, PokemonResponse } from './types'

export interface Response {
  ok: boolean
  status: number
  json: <T>() => Promise<T>
}

export class HttpPokemonService implements PokemonService {
  private readonly _baseUrl: string

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl
  }

  findAll: () => Promise<Pokemon[]> = async () => {
    const response: Response = await fetch(`${this._baseUrl}/pokemon?limit=151`)
    if (response.ok) {
      const { results } = await response.json<PokemonListResponse>()
      return results.map(this._transformToModel)
    }
    return []
  }

  findByName: (name: string) => Promise<Pokemon | null> = async (name: string) => {
    const response: Response = await fetch(`${this._baseUrl}/pokemon/${name}`)

    if (response.ok && response.status === 200) {
      const body = await response.json<PokemonResponse>()
      return this._transformToModel(body)
    }

    return null
  }

  private _transformToModel(response: PokemonResponse): Pokemon {
    const { types, sprites, id, name } = response
    return {
      id,
      name,
      types: types.map(t => t.type.name),
      imageUrl: sprites.other.dream_world.front_default
    }
  }
}
