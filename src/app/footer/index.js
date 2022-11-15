import React, {Component, useEffect, useRef} from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {Link, NavLink, useHistory} from 'react-router-dom'
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


function Footer(props) {
    const history = useHistory()
    return (
        <footer>
            <div className="footer_content">
                <div className="footer_link">
                    <div className="footer_link_item">
                        <ul className="list_item">
                            <li>
                                <Link to="/">Udemy Business</Link>
                                <Link to="/">Teach on Udemy</Link>
                                <Link to="/">Get the app</Link>
                                <Link to="/">About us</Link>
                                <Link to="/">Contact us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer_link_item">
                        <ul className="list_item">
                            <li>
                                <Link to="/">Careers</Link>
                                <Link to="/">Blog</Link>
                                <Link to="/">Help and Support</Link>
                                <Link to="/">Affiliate</Link>
                                <Link to="/">Investors</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer_link_item">
                        <ul className="list_item">
                            <li>
                                <Link to="/">Terms</Link>
                                <Link to="/">Privacy policy</Link>
                                <Link to="/">Cookie settings</Link>
                                <Link to="/">Sitemap</Link>
                                <Link to="/">Accessibility statement</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="change_language_button">
                        <Flags/>
                    </div>
                </div>
                <div className="footer_logo">
                   <div className="logo">
                       <img src={Images.LOGO_INVERTED} alt="logo" className="logo"/>
                   </div>
                    <div className="description">
                        <p>© 2022 Udemy Clone by Chun.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default withLocalize(Footer)
