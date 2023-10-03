export interface LoginRequest {
  email: string
  password: string
  rememberMe: boolean
}

export interface CreateAccountRequest {
  email: string
  password: string
  checkPassword: string
  agreeWithTerms: boolean
}
