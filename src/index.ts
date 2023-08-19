import express from 'express'
import dotenv from 'dotenv'
import UserRouter from './infrastructure/http/routes/users-route'
import LoginRouter from './infrastructure/http/routes/login-route'
import PokemonRouter from './infrastructure/http/routes/pokemon-route'

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT ?? 8080

app.get('/', (_, res) => {
  res.send('Express + TypeScript')
})

app.use('/users', UserRouter)
app.use('/login', LoginRouter)
app.use('/pokemon', PokemonRouter)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://0.0.0.0:${PORT}`)
})
