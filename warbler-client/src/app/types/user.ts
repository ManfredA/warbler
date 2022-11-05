export interface User {
  username: string
  photoUrl?: string
  email: string
  id: string
}

export interface UserState {
  isAuthenticated: boolean
  user?: User
  isLoading: boolean
}