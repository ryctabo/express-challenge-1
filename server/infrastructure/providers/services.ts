import config from '../config'
import { HttpPokemonService } from '../remoting/http-pokemon-service'

const pokemonService = new HttpPokemonService(config.pokemon.baseUrl)

export {
  pokemonService
}
