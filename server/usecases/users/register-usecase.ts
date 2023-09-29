import { NewUser, UserWithoutSensitiveData } from '@domain/users/types'
import { removeSensitiveData } from '@domain/users/users-functions'
import { userRepository } from '@infra/providers/repositories'

export default async function RegisterUser(user: NewUser): Promise<UserWithoutSensitiveData> {
  return removeSensitiveData(await userRepository.save(user))
}
