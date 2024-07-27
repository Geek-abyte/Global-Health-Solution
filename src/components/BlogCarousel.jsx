// src/components/BlogCarousel.js
import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import BlogCard from './BlogCard';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

const BlogCarousel = ({ blogs, visible, className }) => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Latest Posts</h2>
      <div className="relative">
        <CarouselProvider
          naturalSlideWidth={100}
          isIntrinsicHeight
          visibleSlides={visible}
          totalSlides={blogs.length}
          step={3}
          className={`${className} mx-auto`}
        >
          <Slider className="">
            {blogs.map((blog) => (
              <Slide index={blog.id} key={blog.id} style={{ margin: "10px"}}>
                <BlogCard blog={blog} fixedHeight={true}/>
              </Slide>
            ))}
          </Slider>
          <ButtonBack className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md">
            <IoIosArrowDropleftCircle size={40} className="text-gray-800" />
          </ButtonBack>
          <ButtonNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md">
            <IoIosArrowDroprightCircle size={40} className="text-gray-800" />
          </ButtonNext>
        </CarouselProvider>
      </div>
    </div>
  );
};

export default BlogCarousel;