import React, {Component, useEffect, useRef} from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {NavLink, useHistory} from 'react-router-dom'
import {withLocalize} from 'react-localize-redux'
import Icon from '@ant-design/icons';

import {TYPES, actions} from '@/store/actions'
import Storage from '@/utils/storage'
import Request from '@/utils/request'

/** component */
import Flags from '@/components/flags'
import Notification from '@/components/notification'
import ModalComponents from '@/components/modal'
/** asset */
import {Images} from '@/theme'
import './style.scss'
import {listCourseByCategories} from "../../api/course";

// @withLocalize
// @connect((state) => ({
//   uiStore: state.ui
// }), {
//   toggleSideBar: actions.toggleSideBar
// })

function Header(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const getListCategories = useSelector(state => state.course?.list_categories)
    const activeHome = () => {
        const allActive = document.querySelectorAll('.active')
        allActive.forEach((element) => element.classList.remove('active'))
        const subAll = document.querySelectorAll('.sub-menu')
        subAll.forEach((ele) => {
            if (ele) {
                ele.style.height = 0
            }
        })
    }
    const token = Storage.get('ACCESS_TOKEN')
    const onLogout = () => {
        const {translate} = props
        Storage.remove('ACCESS_TOKEN')
        Request.removeAccessToken()
        history.push('/login')
        Notification.success(translate('success-messages.LOGOUT_SUCCESS'))
    }
    useEffect(() => {
        dispatch(actions.listCategories())
    },[])
    const {toggleSideBar, translate} = props
    return (
        <header>
            <div className="header-left">
                <NavLink
                    exact
                    to="/"
                    className="menu-item"
                    onClick={activeHome}
                >
                    <img src={Images.LOGO} alt="logo" className="logo-header"/>
                </NavLink>
                <div className="categories-header">
                    {translate('header.categories')}
                    <div className="dropdown-menu dropdown-menu-animation">
                        {getListCategories.map((item,index) =>(
                            <NavLink to="/" key={index} className="dropdown-item">{item.tenDanhMuc}</NavLink>
                        ))}
                    </div>

                </div>
            </div>
            <div className="header-right">
                {token ?  <p className="link-login" onClick={onLogout}>
                    {translate('header.logout')}
                </p> :  <div className="header-right">
                    <p className="link-login" onClick={() => history.push("/login")}>
                        {translate('header.login')}
                    </p>
                    <p className="link-login link-signUp" onClick={() => history.push("/login")}>
                        {translate('header.signup')}
                    </p>
                </div>}
                <div className="flags-login">
                    <Flags/>
                </div>
                {/*<Icon type="menu" className="btn-menu-header" onClick={toggleSideBar}/>*/}
            </div>
        </header>
    )
}

export default withLocalize(Header)
