/** @jsx jsx */
import {jsx} from '@emotion/core'

import React from 'react'
import * as auth from 'auth-provider'
import {client} from 'utils/api-client'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

const getUser = () => { 
  return auth.getToken().then(token => client("me", {token}))
}

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => { 
    getUser
      .then(data => setUser(data.user))
      .catch(error => console.log("No valid token available for login"))
  },[])

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
