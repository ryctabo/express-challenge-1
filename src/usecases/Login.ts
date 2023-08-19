import { getUserByUsername } from '../infrastructure/repositories/UserRepository'
import { AuthRequest, AuthToken } from '../types'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export default async function loginUseCase(
  req: AuthRequest
): Promise<AuthToken | null> {
  const user = await getUserByUsername(req.username)

  if (user !== null && user.username === req.username && user.password === req.password) {
    const { username, password } = user
    const signature = `${username}:${password}`
    const tokenBase64 = Buffer.from(signature, 'utf-8').toString('base64')
    return { token: tokenBase64 }
  }

  return null
}
