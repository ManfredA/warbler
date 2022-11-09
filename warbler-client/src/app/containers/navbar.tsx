import { logout, selectUser } from '../state/slices'
import { useAppDispatch, useAppSelector } from '../hooks'

import { Link } from 'react-router-dom'

export function Navbar() {
  const { isAuthenticated, user } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  function handleLogout() {
    dispatch(logout())
  }

  return (
    <nav className="navbar navbar-expand">
        <Link to='/' className='navbar-brand'>
          <img src={`${process.env.PUBLIC_URL}/images/warbler-logo.png`} alt="Warbler Home" />
        </Link>
        {isAuthenticated ?
        <ul className='nav navbar-nav navbar-right'>
          <li><Link to={`/users/${user?.id}/messages/new`}>New Messages </Link></li>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      : <ul className='nav navbar-nav navbar-right'>
        <li >
          <Link to='/sign-in'>Login</Link>
        </li>
        <li>
          <Link to='/sign-up'>Sign up</Link>
        </li>
      </ul>}

    </nav>)
}