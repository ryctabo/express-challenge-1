import { createNewUser } from '../infrastructure/repositories/UserRepository'
import { NewUser, UserWithoutSensitiveData } from '../types'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export default async function registerNewUserUseCase(
  user: NewUser
): Promise<UserWithoutSensitiveData> {
  return await createNewUser(user)
}
