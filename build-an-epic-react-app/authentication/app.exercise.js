/** @jsx jsx */
import {jsx} from '@emotion/core'

import React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

function App() {
  const [user, setUser] = React.useState(null);

  const login = form => auth.login(form).then(user => setUser(user));
  const register = form => auth.register(form).then(user=> setUser(user));
  const logout = () => { auth.logout(); setUser(null)}

  return user ? <AuthenticatedApp user={user} logout={logout}/> : <UnauthenticatedApp login={login} register={register}/>
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
