import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";

/** component */
import Page from '@/components/page'
import {TYPES, actions} from '@/store/actions'
import Carousel from "@/components/carousel";
import {Images} from '@/theme'

/** asset */
import './style.scss'
import {getCourseByCategories} from "../../api/course";
import {useParams} from "react-router-dom";


function ListCourseCategory() {
    const dispatch = useDispatch()
    const {maDanhMuc} = useParams()
    const listCourse = useSelector(state => state.course.course_by_categories)
    const settingCarousel = {
        dots: false,
        infinite: false,
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
        dispatch(actions.getCourseByCategories({maDanhMuc}))
    }, [])
    return (
        <Page className="home">
            <div className="content">
                List course
                <section className="section_course_list">
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

export default ListCourseCategory
