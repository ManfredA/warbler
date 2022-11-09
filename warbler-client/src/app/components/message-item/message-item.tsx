import { Link } from "react-router-dom"
import Moment from 'react-moment'
export function MessageItem(
  {
    date,
    isAuthor,
    onRemoveMessage,
    photoUrl,
    text,
    username,
  }: {
    date: string,
    onRemoveMessage: () => void
    photoUrl?: string
    text: string
    username: string
    isAuthor: boolean
  }) {
  return <div>
    <li className="list-group-item gap-2">

    <img src={photoUrl} alt="url" className="timeline-image" style={{ height: 100, width: 100 }} />
    <div >
      <Link to='/'>@{username}</Link>
      <span className="text-muted">
      {/* TODO: this should be done using css */}
        &nbsp;
        <Moment className='text-muted' format="Do MMMM YYYY">
          {date}
        </Moment>
      </span>
      <p>{text}</p>
      <button className="btn btn-danger" onClick={onRemoveMessage} disabled={!isAuthor}>Delete message</button>
    </div>
    </li>
  </div>
}