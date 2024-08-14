export interface AuthModel {
  accessToken: string,
  loginType: string,
}

export interface UserModel {
  id: number
  name: string
  pass?: string | undefined
  email: string
}
