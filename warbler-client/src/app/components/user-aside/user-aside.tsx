// import DefaultProfileImg from "/images/default-profile-image.jpg";
import React from "react";
import { selectUser } from "../../state";
import { useAppSelector } from "../../hooks";

const UserAside = () => {
  const { user } = useAppSelector(selectUser)

  return(
  <aside className="col-sm-2">
    <div className="panel panel-default">
      <div className="panel-body">
        <img
          src={user?.photoUrl || '/images/default-profile-image.jpg'}
          alt={user?.username}
          width="200"
          height="200"
          className="img-thumbnail"
        />
      </div>
    </div>
  </aside>
);
}

export default UserAside;
