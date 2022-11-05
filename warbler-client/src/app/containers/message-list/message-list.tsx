import { loadMessages, selectMessages } from "../../state/slices/messages"
import { useAppDispatch, useAppSelector } from "../../hooks"

import { MessageItem } from "../../components/message-item"
import { selectUser } from "../../state"
import { useEffect } from "react"

export function MessageList() {
  const { user } = useAppSelector(selectUser)
  const { messages } = useAppSelector(selectMessages)
  const dispatch = useAppDispatch()
  console.log('messages: ', messages);

  useEffect(() => {
    if (user) {
      console.log('here!');
      dispatch(loadMessages(user.id))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!messages.length) {
    return <h1>No messages to show.</h1>
  }
  return(
    <div className="row col-sm-8">
      <div className="offset-1 col-sm-10">
        <ul className="list-group" id="messages">
          {messages.map(message => (
            <MessageItem key={message.id} date={message.date} text={message.text} username={message.user?.username || ''} photoUrl={message.user?.photoUrl} />
          ))}
        </ul>
      </div>
    </div>
  )
}