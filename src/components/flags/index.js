import React, {Component, useEffect, useRef, useState} from 'react'
import {withLocalize} from 'react-localize-redux'

import Storage from '@/utils/storage'

/** asset */
import {Images} from '@/theme'
import './style.scss'

import ModalComponents from '@/components/modal'


function Flags(props) {
    const ref = useRef()
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
        <>
            <div className="flags" onClick={() => ref.current.openModal()}>
                <img src={Images[`${imageFlag.code.toUpperCase()}_FLAG`]} alt=""/>
            </div>
            <ModalComponents ref={ref}>
                {languages.map((language) =>
                    (
                        <div
                            onClick={() => {
                                setActiveLanguage(language.code)
                                Storage.set('LANGUAGE', language.code)
                                setImageFlag({name: `${language.name}`, code: `${language.code}`, active: true})
                                language.active ? ref.current.closeModal() : null

                            }}
                            key={language.code}
                            className={language.active ? 'flag-active' : 'flag-noneActive'}
                        >
                            <img
                                src={Images[`${language.code.toUpperCase()}_FLAG`]}
                                alt=""
                                className="flag-img"
                            />
                            <p>{language.name}</p>
                        </div>
                    )
                )}
            </ModalComponents>
        </>


    )
}

export default withLocalize(Flags)
