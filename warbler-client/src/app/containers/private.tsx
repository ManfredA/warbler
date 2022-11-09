import { ReactNode, useEffect } from "react";

import { selectUser } from "../state";
import { useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";

export function Private({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAppSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if(!isAuthenticated) {
      console.log('here!');
      navigate('/sign-in')
    }
  }, [])


  return <>{children}</>
}