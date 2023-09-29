import { UserWithoutSensitiveData } from '@domain/users/types'
import { removeSensitiveData } from '@domain/users/users-functions'
import { userRepository } from '@infra/providers/repositories'

export default async function FindAllUser(): Promise<UserWithoutSensitiveData[]> {
  const users = await userRepository.findAll()
  return users.map(user => removeSensitiveData(user))
}
