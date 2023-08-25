import { getUserByUsername } from '../infrastructure/repositories/UserRepository'
import { UserWithoutSensitiveData } from '../types'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export default async function findUserByUsernameUseCase(
  username: string
): Promise<UserWithoutSensitiveData | null> {
  return await getUserByUsername(username)
}
