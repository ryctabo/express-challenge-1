import express from 'express'
import path from 'path'

import UserRouter from './routes/user-route'
import LoginRouter from './routes/login-route'
import PokemonRouter from './routes/pokemon-route'

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'www')))

server.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'www/index.html'))
})

server.use('/users', UserRouter)
server.use('/login', LoginRouter)
server.use('/pokemon', PokemonRouter)

export default server
