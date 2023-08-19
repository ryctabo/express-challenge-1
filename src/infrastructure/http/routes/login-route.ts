import express from 'express'
import loginUseCase from '../../../usecases/Login'
import { AuthRequest } from '../../../types'

const router = express.Router()

router.post('/', (req, res) => {
  loginUseCase(req.body as AuthRequest).then(
    (data) => {
      if (data !== null) {
        res.json(data)
      } else {
        res.status(403).json({
          description: 'Ops! credentials is invalid'
        })
      }
    },
    (err) => {
      console.error(err)
    }
  )
})

export default router
