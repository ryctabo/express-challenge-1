import express from 'express'
import findAllUsersUseCase from '../../../usecases/FindAllUsers'
import findPokemonsByUserIdUseCase from '../../../usecases/FindPokemonsByUserId'
import pushPokemonInUserUseCase from '../../../usecases/PushPokemonInUser'
import removePokemonInUser from '../../../usecases/RemovePokemonInUser'

const router = express.Router()

router.get('/', (_, res) => {
  findAllUsersUseCase().then(
    data => {
      console.log(data)
      res.json(data)
    },
    err => {
      console.error(err)
    }
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
