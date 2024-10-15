import React, { useState, useEffect, useCallback } from 'react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

const CustomCarousel = ({ children, autoScroll = false, autoScrollInterval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const childrenCount = React.Children.count(children);

  const updateIndex = useCallback((newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= childrenCount) {
      newIndex = childrenCount - 1;
    }
    setActiveIndex(newIndex);
  }, [childrenCount]);

  useEffect(() => {
    if (autoScroll && !paused) {
      const interval = setInterval(() => {
        updateIndex(activeIndex + 1);
      }, autoScrollInterval);

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  }, [autoScroll, autoScrollInterval, activeIndex, paused, updateIndex]);

  return (
    <div
      className="overflow-hidden relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 transition-transform duration-300"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { className: `w-full` });
        })}
      </div>
      {activeIndex > 0 && (
        <button
          onClick={() => updateIndex(activeIndex - 1)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
        >
          <IoIosArrowDropleftCircle size={40} className="text-gray-600 hover:text-gray-800" />
        </button>
      )}
      {activeIndex < childrenCount - 1 && (
        <button
          onClick={() => updateIndex(activeIndex + 1)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
        >
          <IoIosArrowDroprightCircle size={40} className="text-gray-600 hover:text-gray-800" />
        </button>
      )}
    </div>
  );
};

export default CustomCarousel;
