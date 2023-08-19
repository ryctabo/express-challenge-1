import express from 'express'

import findAllUsersUseCase from '../../../usecases/FindAllUsers'
import findPokemonsByUserIdUseCase from '../../../usecases/FindPokemonsByUserId'
import pushPokemonInUserUseCase from '../../../usecases/PushPokemonInUser'
import removePokemonInUser from '../../../usecases/RemovePokemonInUser'
import registerNewUserUseCase from '../../../usecases/RegisterNewUser'
import findUserByUsernameUseCase from '../../../usecases/FindUserByUsername'

import { NewUser } from '../../../types'

const router = express.Router()

router.get('/', (_, res) => {
  findAllUsersUseCase().then(
    data => {
      res.json(data)
    },
    err => {
      console.error(err)
    }
  )
})

router.get('/:username', (req, res) => {
  findUserByUsernameUseCase(req.params.username).then(
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
  registerNewUserUseCase(req.body as NewUser).then(
    (data) => {
      res.json(data)
    },
    (err) => console.log(err)
  )
})

router.get('/favorites/:userId', (req, res) => {
  findPokemonsByUserIdUseCase(req.params.userId).then(
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
  pushPokemonInUserUseCase(userId, pokemon).then(
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
  removePokemonInUser(userId, pokemon).then(
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
