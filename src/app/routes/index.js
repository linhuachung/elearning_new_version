import React, {Component, Suspense, lazy, useEffect} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import setLocale from 'yup/lib/setLocale'
import {renderToStaticMarkup} from 'react-dom/server'
import Storage from '@/utils/storage'
import Request from '@/utils/request'
import {withLocalize} from 'react-localize-redux'

/** Languages */
import errorJP from '@/languages/error-messages/jp.json'
import errorEN from '@/languages/error-messages/en.json'
import errorVI from '@/languages/error-messages/vi.json'
import EN from '@/languages/app/en.json'
import JP from '@/languages/app/jp.json'
import VI from '@/languages/app/vi.json'

/** Layout */
import NavBar from '@/app/nav-bar'
import Header from '@/app/header'
import Footer from '@/app/footer'

/** component */
import Loading from '@/components/loading'
import Page from '@/components/page'
import {initialize, addTranslation} from "react-localize-redux";

/** page */
const Login = lazy(() => import('@/pages/account/login'))
const Home = lazy(() => import('@/pages/home'))
const NotFound = lazy(() => import('@/pages/not-found'))

const PrivateRoute = ({condition, redirect, ...props}) => {
    condition = condition()
    if (condition) return <Route {...props} />
    return <Redirect to={redirect}/>
}
const PublicRoute = ({condition, redirect, ...props}) => {
  return <Route {...props} />
}
setLocale({
    mixed: {
        required: 'required'
    },
    string: {
        email: 'email',
        min: ({min}) => `min${min}`,
        max: ({max}) => `max${max}`,
        matches: ({matches, message}) => (message || matches || 'matches')
    }
})

function RoutesComponent(props) {
    const {initialize, addTranslationForLanguage: add} = props
    useEffect(() => {
        if (!Storage.has('LANGUAGE') || Storage.get('LANGUAGE') === 'vi') {
            initialize({
                languages: [{
                    name: 'Vietnamese',
                    code: 'vi'
                }, {
                    name: 'Japanese',
                    code: 'jp'
                }, {
                    name: 'English',
                    code: 'en'
                }],
                options: {
                    renderToStaticMarkup
                }
            })
        }

        if (Storage.get('LANGUAGE') === 'en') {
            initialize({
                languages: [{
                    name: 'English',
                    code: 'en'
                }, {
                    name: 'Japanese',
                    code: 'jp'
                }, {
                    name: 'Vietnamese',
                    code: 'vi'
                }],
                options: {
                    renderToStaticMarkup
                }
            })
        }

        if (Storage.get('LANGUAGE') === 'jp') {
            initialize({
                languages: [{
                    name: 'Japanese',
                    code: 'jp'
                }, {
                    name: 'English',
                    code: 'en'
                }, {
                    name: 'Vietnamese',
                    code: 'vi'
                }],
                options: {
                    renderToStaticMarkup
                }
            })
        }

        add(errorEN, 'en')
        add(errorJP, 'jp')
        add(errorVI, 'vi')
        add(EN, 'en')
        add(JP, 'jp')
        add(VI, 'vi')
    }, [])

    const token = Storage.get('ACCESS_TOKEN')
    if (token) {
        Request.setAccessToken(`Bearer ${token}`)
    }
    const renderLazyComponent = (LazyComponent, params) => (props) => <LazyComponent {...props} {...params} />
     const renderAuthRoutes = () => (
        <Suspense fallback={<Page className="page-loading"><Loading/></Page>}>
            <Header/>
            {/*<NavBar/>*/}
            <Switch>
                <Route path="/not-found" component={renderLazyComponent(NotFound)}/>
                <Redirect to="/not-found"/>
            </Switch>
            <Footer/>
        </Suspense>
    )
    const renderPublicRoutes = () => (
        <Suspense fallback={<Page className="page-loading"><Loading/></Page>}>
            <Header/>
            {/*<NavBar/>*/}
            <Switch>
                <Route exact path="/" component={renderLazyComponent(Home)}/>
                <Redirect to="/not-found"/>
            </Switch>
            <Footer/>
        </Suspense>
    )
    return (
        <BrowserRouter>
            <Suspense fallback={<Page><Loading/></Page>}>
                <Switch>
                    {token ?  <PublicRoute component={renderPublicRoutes}/> : <Route exact path="/login" component={renderLazyComponent(Login)}/>}
                    <Route path="/not-found" component={renderLazyComponent(NotFound)}/>
                    <PublicRoute
                        component={renderPublicRoutes}
                    />
                    <PrivateRoute
                        condition={() => Storage.has('ACCESS_TOKEN')}
                        redirect="/login"
                        path="/"
                        component={renderAuthRoutes}
                    />
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}

export default withLocalize(RoutesComponent)
