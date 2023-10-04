export interface CreateAccountRequest {
  email: string
  password: string
  checkPassword: string
  agreeWithTerms: boolean
}
