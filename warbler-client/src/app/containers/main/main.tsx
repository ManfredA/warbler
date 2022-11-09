import { Route, Routes } from 'react-router-dom'

import { NotFound } from '../../components/not-found/not-found'
import { Private } from '../private'
import { routes } from './routes-list'

export function Main() {
  return <div  className="px-4">
    <Routes>
      {routes.map(({ route, Component, isPrivate }) => (
      <Route path={route} key={route} element={
        isPrivate ? <Private><Component/></Private>: <Component/>
      } />))}
      <Route path='*' element={<NotFound />} />
    </Routes>
  </div>
}
