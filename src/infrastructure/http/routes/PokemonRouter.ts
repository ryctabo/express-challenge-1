import express from 'express'
import findAllPokemonsUseCase from '../../../usecases/FindAllPokemons'
import findPokemonByNameUseCase from '../../../usecases/FindPokemonByName'

const router = express.Router()

router.get('/', (_, res) => {
  findAllPokemonsUseCase().then(
    (data) => {
      res.json(data)
    },
    (err) => console.error(err)
  )
})

router.get('/:name', (req, res) => {
  findPokemonByNameUseCase(req.params.name).then(
    (data) => {
      if (data !== null) {
        res.json(data)
      } else {
        res.status(404).json({
          message: `Pokemon with name ${req.params.name} was not found`
        })
      }
    },
    (err) => console.error(err)
  )
})

export default router
