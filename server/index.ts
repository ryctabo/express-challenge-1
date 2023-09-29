import server from '@infra/http/server'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT ?? 8080

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://0.0.0.0:${PORT}`)
})
