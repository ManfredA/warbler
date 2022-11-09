import { useAppDispatch, useAppSelector } from "../../hooks"

import { postNewMessage } from "../../state/slices/messages"
import { selectErrors } from "../../state"
import { useParams } from "react-router-dom"
import { useState } from "react"

export function MessageForm() {
  const { userId = '' } = useParams()
  console.log('userId: ', userId);
  const [message, setMessage] = useState({ text: ''})
  const { message: errorMessage } = useAppSelector(selectErrors)
  const dispatch = useAppDispatch()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(postNewMessage({ message, userId }))
  }

  return(
    <div className="row justify-content-md-center text-center mt-4">
   <form onSubmit={handleSubmit} className='col-md-6'>
    {errorMessage && (
      <div className="alert alert-danger">{errorMessage}</div>
    )}
    <input
      type="text"
      className="form-control"
      value={message.text}
      onChange={e => setMessage({ text: e.target.value })}
    />
    <button type="submit" className="btn btn-success mt-2">
      Send my message
    </button>
  </form>
    </div>
  )
}