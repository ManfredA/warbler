import { MessageList } from "../../containers/message-list/message-list";
import UserAside from "../user-aside/user-aside";

export function MessageTimeline() {
  return <div className="row">
    <UserAside />
    <MessageList />
  </div>
}
