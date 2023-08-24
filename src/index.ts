import express from 'express'
import dotenv from 'dotenv'
import UserRouter from './infrastructure/http/routes/UserRouter'
import LoginRouter from './infrastructure/http/routes/LoginRouter'
import PokemonRouter from './infrastructure/http/routes/PokemonRouter'

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
