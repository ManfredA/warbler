import { Link } from "react-router-dom";
import { MessageTimeline } from "../message-timeline/message-timeline";
import { selectUser } from "../../state";
import { useAppSelector } from "../../hooks";

export function HomePage() {
  const { isAuthenticated, user } = useAppSelector(selectUser)
  console.log('user: ', user, isAuthenticated);
  return (
    isAuthenticated
      ?
      (<div>
        <MessageTimeline />
      </div>)
      :
      (<div className="home-hero">
        <Link to={'/signup'} className='btn btn-primary'>Sign up here</Link>
      </div>
      ))
}