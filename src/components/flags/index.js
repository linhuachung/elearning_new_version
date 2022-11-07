import React, {Component, useEffect, useState} from 'react'
import {withLocalize} from 'react-localize-redux'

import Storage from '@/utils/storage'

/** asset */
import {Images} from '@/theme'
import './style.scss'


function Flags(props) {
    const [imageFlag, setImageFlag] = useState({name: 'Vietnamese', code: 'vi', active: true})

    useEffect(() => {
        if (!Storage.has('LANGUAGE') || Storage.get('LANGUAGE') === 'vi') {
            setImageFlag({
                name: 'Vietnamese', code: 'vi', active: true
            })
        }

        if (Storage.get('LANGUAGE') === 'en') {
            setImageFlag({
                name: 'English', code: 'en', active: true
            })
        }
        if (Storage.get('LANGUAGE') === 'jp') {
            setImageFlag({
                name: 'Japanese', code: 'jp', active: true
            })
        }

    }, [])
    const {languages, setActiveLanguage} = props
    return (
        <div className="flags">
            <img src={Images[`${imageFlag.code.toUpperCase()}_FLAG`]} className="flag" alt=""/>
            <div className="dropdown-flags">
                {languages.map((language) => !language.active &&
                    (
                        <img
                            onClick={() => {
                                setActiveLanguage(language.code)
                                Storage.set('LANGUAGE', language.code)
                                setImageFlag({
                                    name: `${language.name}`, code: `${language.code}`, active: true
                                })
                            }}
                            key={language.code}
                            src={Images[`${language.code.toUpperCase()}_FLAG`]}
                            className={language.active ? 'flag active' : 'flag'}
                            alt=""
                        />
                    )
                )}
            </div>
        </div>
    )
}

export default withLocalize(Flags)
