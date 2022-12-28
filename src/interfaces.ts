export interface ILogin {
  username: string
  password: string
}

export interface IRegister {
  name: string
  email: string
  username: string
  password: string
}

export interface ICurrentUser {
  email: string
  name: string
  username: string
  inserted_at: string
}

export interface IGetResponse {
  success: boolean
  data: ICurrentUser
}

export interface IAcknowledgementResponse {
  success: boolean
  message: string
  errors?: string[]
}