import { authenticateUser, errorSlice, selectErrors } from "../../state/slices";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react"
import { useLocation, useMatch, useNavigate } from "react-router-dom";

enum AuthType {
  signIn = 'signin',
  signUp = 'signup'
}

export function AuthForm({ header, buttonText }: { header: string, buttonText: string }) {
  const isSignIn = useMatch('/sign-in')
  const navigate = useNavigate()
  const errors = useAppSelector(selectErrors)
  const hasErrors = Boolean(errors.message)
  const dispatch = useAppDispatch();
  const location = useLocation()
  // TODO: use react hook forms
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    photoUrl: '',
    username: '',
  })

  useEffect(() => {
    dispatch(errorSlice.actions.removeError())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const authType = isSignIn ? AuthType.signIn : AuthType.signUp
    dispatch(authenticateUser({ userData: formState, type: authType }))
    .then((res) => {
      if(res.type.includes('rejected')) return
      navigate('/')
    })
    .catch((err) => { console.log(err); })
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  return (
    <div>

      <div className="row justify-content-md-center text-center">
        {hasErrors && <div className="alert alert-danger">
          {errors.message}
        </div>}
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h1>{header} {formState.username || formState.email}</h1>
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              name="email"
              onChange={handleChange}
              type="text"
              value={formState.email}
            />

            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              name="password"
              onChange={handleChange}
              type="password"
            />

            {
              !isSignIn && <>
                <label htmlFor="username">Username</label>
                <input
                  className="form-control"
                  name="username"
                  onChange={handleChange}
                  type="username"
                  value={formState.username}
                />

                <label htmlFor="photoUrl">image-url</label>
                <input
                  className="form-control"
                  name="photoUrl"
                  onChange={handleChange}
                  type="text"
                  value={formState.photoUrl}
                />
              </>
            }
            <button className="btn btn-primary" type="submit">{buttonText}</button>
          </form>
        </div>
      </div>
    </div>)
}