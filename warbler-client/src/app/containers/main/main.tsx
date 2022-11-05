import { Route, Routes } from 'react-router-dom'

import { NotFound } from '../../components/not-found/not-found'
import { routes } from './routes-list'

export function Main() {
  return <div className="">
    <Routes>
      {routes.map(({ route, Component }) => <Route path={route} key={route} element={<Component/>}></Route>)}
      <Route path='*' element={<NotFound />} />
    </Routes>
  </div>
}
