import { deleteMessage, loadMessages, selectMessages } from "../../state/slices/messages"
import { useAppDispatch, useAppSelector } from "../../hooks"

import { MessageItem } from "../../components/message-item"
import { selectUser } from "../../state"
import { useEffect } from "react"

export function MessageList() {
  const { user } = useAppSelector(selectUser)
  const { messages } = useAppSelector(selectMessages)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user) {
      dispatch(loadMessages())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleRemoveMessage(userId: string, messageId: string) {
    dispatch(deleteMessage({ userId, messageId }))
  }

  if (!messages.length) {
    return <h1>No messages to show.</h1>
  }
  return(
    <div className="row col-sm-8">
      <div className="offset-1 col-sm-10 overflow-auto">
        <ul className="list-group" id="messages">
          {messages.map(message => (
            <MessageItem
            key={message.id}
            date={message.createdAt}
            text={message.text}
            username={message.user?.username || ''}
            photoUrl={message.user?.photoUrl}
            onRemoveMessage={() => {handleRemoveMessage(message.user?.id || '', message.id)}}
            isAuthor={user?.id === message.user?.id}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}