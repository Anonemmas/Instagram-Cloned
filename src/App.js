import React, { lazy, Suspense} from 'react';
import "./App.css"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import * as ROUTES from "./constants/routes"
import { UserContextProvider } from './context/userContext';
// import IsUserLoggedIn from './helpers/is-user-logged-in';
import useAuthListener from './hooks/use-auth-listener';
import ProtectedRoute from './helpers/protected-route';
// import { log } from 'async';


const Dashboard = lazy(() => import ('./pages/dashboard'));
const Login = lazy(() => import ('./pages/login'));
const SignUp = lazy(() => import ('./pages/signup'));
const Profile = lazy(() => import ('./pages/profile'));
const PortalPage = lazy(() => import ('./pages/portal'));
const NotFound = lazy(() => import ('./pages/not-found'));


export default function App() {
    const {user} = useAuthListener()
    return (
        <UserContextProvider>
            <Router>
                <Suspense fallback={<p>Loading...</p>}>
                    <Switch>
                        <Route path={ROUTES.LOGIN}>
                            <Login />
                        </Route>

                        <Route path={ROUTES.SIGN_UP}>
                            <SignUp />
                        </Route>

                        <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
                            <Dashboard />
                        </ProtectedRoute>
                        
                        <Route path={ROUTES.PROFILE} exact>
                            <Profile />
                        </Route>

                        <Route path={ROUTES.PORTAL} exact>
                            <PortalPage />
                        </Route>

                        <Route >
                            <NotFound />
                        </Route>
                    </Switch>
                </Suspense>
            </Router>
        </UserContextProvider>
    )
}