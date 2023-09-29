import express from 'express'
import { AuthRequest } from '@domain/auth/types'
import Login from '@usecases/auth/login-usecase'

const router = express.Router()

router.post('/', (req, res) => {
  Login(req.body as AuthRequest).then(
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
