export interface Config {
  pokemon: {
    baseUrl: string
  }
}

const config: Config = {
  pokemon: {
    baseUrl: 'https://pokeapi.co/api/v2'
  }
}

export default config
