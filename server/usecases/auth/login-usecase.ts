import { AuthRequest, AuthToken } from '@domain/auth/types'
import { userRepository } from '@infra/providers/repositories'

export default async function Login(req: AuthRequest): Promise<AuthToken> {
  const user = await userRepository.findByUsername(req.username)

  if (user !== null) {
    const { username, password } = user

    if (username === req.username && password === req.password) {
      const signature = `${username}:${password}`
      const tokenBase64 = Buffer.from(signature, 'utf-8').toString('base64')
      return { token: tokenBase64 }
    } else {
      throw Error('Unauthenticated')
    }
  }

  throw Error(`User with username ${req.username} was not found!`)
}
