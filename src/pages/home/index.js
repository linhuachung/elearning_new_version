import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";

/** component */
import Page from '@/components/page'
import Carousel from "@/components/carousel";
import {TYPES, actions} from '@/store/actions'
import {Images} from '@/theme'

/** asset */
import './style.scss'


function Home() {
    const dispatch = useDispatch()
    const listCourse = useSelector(state => state.course?.list_course)

    const settingCarousel = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }
    useEffect(() => {
        dispatch(actions.getListCourse())
    }, [])
    return (
        <Page className="home">
            <div className="content">
                Home page
                <section className="section_course">
                    <Carousel settings={settingCarousel}>
                        {listCourse.map(x => {
                            return (
                                <div key={x.maKhoaHoc} className="carousel_item">
                                    <img src={x.hinhAnh}
                                         onError={({ currentTarget }) => {
                                             currentTarget.onerror = null;
                                             currentTarget.src=`${Images.DEFAULT_IMAGE}`;
                                         }}
                                         alt={x.biDanh} className="carousel_img"/>
                                    <p>{x.ngayTao}</p>
                                    <p>{x.luotXem}</p>
                                    <p>{x.tenKhoaHoc}</p>
                                </div>
                            )
                        })}
                    </Carousel>
                </section>
            </div>
        </Page>
    )
}

export default Home
