import { User } from "./user"

export interface Message {
  id: string
  user?: User
  text: string
  date: string
}

export interface MessagesState {
  messages: Message[]
  isLoading: Boolean
}