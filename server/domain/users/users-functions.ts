import { User, UserWithoutSensitiveData } from './types'

export function removeSensitiveData(user: User): UserWithoutSensitiveData {
  const { password, ...noSensitiveData } = user
  return { ...noSensitiveData }
}
