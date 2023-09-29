import express from 'express'
import FindAllPokemon from '@usecases/pokemons/find-all-usecase'
import FindPokemonByName from '@usecases/pokemons/find-by-name-usecase'

const router = express.Router()

router.get('/', (_, res) => {
  FindAllPokemon().then(
    (data) => {
      res.json(data)
    },
    (err) => console.error(err)
  )
})

router.get('/:name', (req, res) => {
  FindPokemonByName(req.params.name).then(
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
