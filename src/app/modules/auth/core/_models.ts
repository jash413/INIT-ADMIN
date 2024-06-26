export interface AuthModel {
  accessToken: string
}

export interface UserModel {
  id: number
  name: string
  pass?: string | undefined
  email: string
}
