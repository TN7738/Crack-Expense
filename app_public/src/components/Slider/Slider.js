import React from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay  } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import './slider.scss';

const Slider = () => {
    SwiperCore.use([Autoplay]);
    return (
        <div className='slider-wrap'>
            <Swiper
                modules={[Pagination, Scrollbar, A11y]}
                autoplay= {{delay: 2500, disableOnInteraction: false}}
                loop={true}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                <SwiperSlide>
                    <div className='parent-wrap'>
                        <div className='left-wrap'>
                            <h2>Create Groups</h2>
                        </div>
                        <div className='right-wrap'>
                            <img src='images/group.png' alt='Create Groups' />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='parent-wrap'>
                        <div className='left-wrap'>
                            <h2>Share Expenses</h2>
                        </div>
                        <div className='right-wrap'>
                            <img src='images/bill.png' alt='Share Expenses' />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='parent-wrap'>
                        <div className='left-wrap'>
                            <h2>Manage To-Dos</h2>
                        </div>
                        <div className='right-wrap'>
                            <img src='images/todo.png' alt='Manage To-Dos' />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Slider;