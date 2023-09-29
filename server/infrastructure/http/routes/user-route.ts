import express from 'express'

import FindAllUser from '@usecases/users/find-all-usecase'
import FindFavoritesPokemonByUser from '@usecases/users/find-favorites-usecase'
import AddFavoritePokemon from '@usecases/users/add-favorite-pokemon-usecase'
import RemoveFavoritePokemon from '@usecases/users/remove-favorite-pokemon-usecase'
import RegisterUser from '@usecases/users/register-usecase'
import FindUserByUsername from '@usecases/users/find-by-username-usecase'

const router = express.Router()

router.get('/', (_, res) => {
  FindAllUser().then(
    data => {
      res.json(data)
    },
    err => {
      console.error(err)
    }
  )
})

router.get('/:username', (req, res) => {
  FindUserByUsername(req.params.username).then(
    (data) => {
      if (data !== null) {
        res.json(data)
      } else {
        res.status(404).json({
          message: `User with username ${req.params.username} was not found`
        })
      }
    },
    (err) => console.error(err)
  )
})

router.post('/', (req, res) => {
  RegisterUser(req.body).then(
    (data) => {
      res.json(data)
    },
    (err) => console.log(err)
  )
})

router.get('/favorites/:userId', (req, res) => {
  FindFavoritesPokemonByUser(req.params.userId).then(
    (data) => {
      if (data !== null) {
        res.json(data)
      } else {
        res.status(404).json({
          message: `User with ID ${req.params.userId} was not found`
        })
      }
    },
    (err) => console.error(err)
  )
})

router.post('/favorites', (req, res) => {
  const { userId, pokemon }: { userId: string, pokemon: string } = req.body
  AddFavoritePokemon(userId, pokemon).then(
    (data) => {
      if (data !== null) {
        res.json(data)
      } else {
        res.status(404).json({
          message: 'User or Pokemon doesn\'t exists'
        })
      }
    },
    (err) => console.error(err)
  )
})

router.delete('/favorites', (req, res) => {
  const { userId, pokemon }: { userId: string, pokemon: string } = req.body
  RemoveFavoritePokemon(userId, pokemon).then(
    (data) => {
      if (data !== null) {
        res.json(data)
      } else {
        res.status(404).json({
          message: 'User or Pokemon doesn\'t exists'
        })
      }
    },
    (err) => console.error(err)
  )
})

export default router
