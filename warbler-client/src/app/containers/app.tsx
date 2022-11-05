import { Main } from "./main/main";
import { Navbar } from "./navbar";
import jwtDecode from 'jwt-decode';
// import { Counter } from "../../features/counter/Counter";
import { setTokenHeader } from "../services/api";
import { useAppDispatch } from "../hooks";
import { userSlice } from "../state";

function App() {
  const dispatch = useAppDispatch()
  const token = localStorage.getItem('jwtToken')
  if(token) {
    setTokenHeader(localStorage.getItem('jwtToken'))
    try {
      dispatch(userSlice.actions.setUser(jwtDecode(token)))
    } catch (error) {
      dispatch(userSlice.actions.setUser(undefined))
    }
  }

  return (
    <div className="app">
      <header className="app-header onboarding">
        <Navbar/>
      </header>
      <Main/>
        {/* <Counter /> */}
    </div>
  );
}

export default App;
