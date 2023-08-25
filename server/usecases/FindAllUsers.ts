import { UserWithoutSensitiveData } from '../types'
import { getAllUsers } from '../infrastructure/repositories/UserRepository'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export default async function findAllUsersUseCase(): Promise<UserWithoutSensitiveData[]> {
  return await getAllUsers()
}
