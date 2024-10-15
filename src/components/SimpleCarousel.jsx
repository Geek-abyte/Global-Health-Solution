import React, { useState, useEffect, useCallback, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const SimpleCarousel = ({ items, autoplay = false, autoplayInterval = 5000 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  const updateItemsPerPage = useCallback(() => {
    const width = window.innerWidth;
    if (width >= 1024) setItemsPerPage(4);
    else if (width >= 768) setItemsPerPage(3);
    else if (width >= 640) setItemsPerPage(2);
    else setItemsPerPage(1);
  }, []);

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, [updateItemsPerPage]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const nextPage = useCallback(() => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  }, [totalPages]);

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    if (autoplay && !isPaused) {
      const interval = setInterval(nextPage, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [autoplay, isPaused, nextPage, autoplayInterval]);

  const getVisibleItems = () => {
    const start = currentPage * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextPage();
    } else if (isRightSwipe) {
      prevPage();
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      ref={carouselRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentPage * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
            style={{ width: `${100 / itemsPerPage}%` }}
          >
            {item}
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <>
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 transition-opacity duration-300 opacity-100 hover:bg-opacity-75 z-10"
            aria-label="Previous page"
          >
            <IoIosArrowBack size={24} />
          </button>
          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 transition-opacity duration-300 opacity-100 hover:bg-opacity-75 z-10"
            aria-label="Next page"
          >
            <IoIosArrowForward size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default SimpleCarousel;
