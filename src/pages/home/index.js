import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";

/** component */
import Page from '@/components/page'
import Carousel from "@/components/carousel";
import {TYPES, actions} from '@/store/actions'

/** asset */
import './style.scss'


function Home() {
    const dispatch = useDispatch()
    const listCourse = useSelector(state => state.course?.list_course)

    const settingCarousel = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,

    }


    useEffect(() => {
        dispatch(actions.getListCourse())
    }, [])
    console.log(listCourse)
    return (
        <Page className="home">
            <div className="content">
                Home page
                <Carousel settings={settingCarousel}>
                    {listCourse.map(x => {
                        return (
                            <div key={x.maKhoaHoc} className="carousel_item">
                                <img src={x.hinhAnh} alt={x.biDanh} className="carousel_img"/>
                                <p>{x.ngayTao}</p>
                                <p>{x.luotXem}</p>
                                <p>{x.tenKhoaHoc}</p>
                            </div>
                        )
                    })}
                </Carousel>
            </div>
        </Page>
    )
}

export default Home
