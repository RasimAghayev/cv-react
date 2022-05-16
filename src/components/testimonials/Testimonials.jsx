import React from "react";
import './testimonials.css';
import AVTR1 from '../../assets/images/avatar1.jpg'
import AVTR2 from '../../assets/images/avatar2.jpg'
import AVTR3 from '../../assets/images/avatar3.jpg'
import AVTR4 from '../../assets/images/avatar4.jpg'
// import Swiper core and required modules
import { Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const dataTestimonials=[
    {
        id:1,
        avatar:AVTR1,
        name:'E-Sayar',
        review:'Rasminoa adsmsao  andoasi ajndasp kasdoiapd adalkjhda a doiajsdkja dkla;djkada;d'
    },
    {
        id:2,
        avatar:AVTR2,
        name:'E-Sayar2',
        review:'Rasminoa adsmsao  andoasi ajndasp kasdoiapd adalkjhda a doiajsdkja dkla;djkada;d2'
    },
    {
        id:3,
        avatar:AVTR3,
        name:'E-Sayar3',
        review:'Rasminoa adsmsao  andoasi ajndasp kasdoiapd adalkjhda a doiajsdkja dkla;djkada;d3'
    },
    {
        id:4,
        avatar:AVTR4,
        name:'E-Sayar4',
        review:'Rasminoa adsmsao  andoasi ajndasp kasdoiapd adalkjhda a doiajsdkja dkla;djkada;d3'
    },
]
const Testimonials=()=>{
    return (
        <section id='testimonials'>
            <h5>Review from clients</h5>
            <h2>Testimonials</h2>
            <Swiper className="container testimonials__container"
                // install Swiper modules
                    modules={[Pagination]}
                    spaceBetween={40}
                    slidesPerView={1}
                    pagination={{ clickable: true }}>
                    {
                        dataTestimonials.map(({avatar, name, review}, index)=>{
                            return(
                                <SwiperSlide key={index} className="testimonial">
                                    <div className="client__avatar">
                                        <img src={avatar} alt=""/>
                                    </div>
                                    <h5 className="client__name">{name}</h5>
                                    <small className="client__review">
                                            {review}
                                    </small>
                                </SwiperSlide>
                            )
                        })
                    }
            </Swiper>
        </section>
    )
}

export default Testimonials