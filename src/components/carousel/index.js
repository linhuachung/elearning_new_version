import React from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel({children, settings}) {
    const NextArrow = props => {
        const {className, style, onClick} = props;
        return (
            <div
                className={className}
                style={{...style, display: "block", background: "red"}}
                onClick={onClick}
            />
        );
    }

    const PrevArrow = props => {
        const {className, style, onClick} = props;
        return (
            <div
                className={className}
                style={{...style, display: "block", background: "green"}}
                onClick={onClick}
            />
        );
    }

    const dataSetting = {
        ...settings,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>
    }

    return (
        <Slider {...dataSetting}>
            {children}
        </Slider>
    )
}

export default Carousel
