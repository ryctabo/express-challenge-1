import { UserWithoutSensitiveData } from '@domain/users/types'
import { userRepository } from '@infra/providers/repositories'

export default async function FindUserByUsername(
  username: string
): Promise<UserWithoutSensitiveData | null> {
  return await userRepository.findByUsername(username)
}
