import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import data from './data';

function App() {
  const [cars, setCars] = useState(data);
  const [index, setIndex] = useState(0);
  let autoSlide;

  useEffect(() => {
    const lastIndex = cars.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [cars, index]);

  // auto slide
  useEffect(() => {
    autoSlide = setInterval(() => {
      setIndex(index + 1);
    }, 10000);
    return () => clearInterval(autoSlide);
  }, [index]);

  return (
    <section className='section'>
      <div className='title'>
        <h2>volkswagen bus</h2>
        <div className="underline"></div>
      </div>
      <div className='section-center'>
        {cars.map((car, carIndex) => {
          const { id, image, photographer, location, quote } = car;
          // assign nextSlide class to all articles
          let position = 'nextSlide';
          // change the class of current slide to activeSlide
          if (carIndex === index) {
            position = 'activeSlide';
          }
          // change the class of last slide to lastSlide
          if (
            carIndex === index - 1 ||
            (index === 0 && carIndex === cars.length - 1)
          ) {
            position = 'lastSlide';
          }
          return (
            <article key={id} className={position}>
              <img
                src={image}
                alt='classic volkswagen model bus'
                className='car-img'
              />
              <h4>
                <span>Photo By </span>
                {photographer}
              </h4>
              <p className='location'>{location}</p>
              <p className='text'>{quote}</p>
            </article>
          );
        })}
        {/* buttons */}
        <button className='prev' onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className='next' onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
