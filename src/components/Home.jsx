import { useRef, useEffect } from 'react';
import locomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/src/locomotive-scroll.scss';
import imagesLoaded from 'imagesloaded';
import GridItem from './GridItem';
import photos from '../data';

import classes from './Home.module.scss';

const clamp = (value, min, max) =>
  value <= min ? min : value >= max ? max : value;

const preloadImages = (selector) => {
  return new Promise((resolve) => {
    imagesLoaded(
      document.querySelectorAll(selector),
      { background: true },
      resolve
    );
  });
};

const Home = () => {
  const ref = useRef(null);
  const leftColumnRef = useRef(null);
  const middleColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  const scroll = useRef({
    cache: 0,
    current: 0,
  });

  useEffect(() => {
    const scrollELement = new locomotiveScroll({
      el: ref.current,
      smooth: true,
      smaartphone: {
        smooth: true,
      },
      getDirection: true,
      getSpeed: true,
    });

    scrollELement.on('scroll', (obj) => {
      scroll.current.current = obj.scroll.y;
      const distance = scroll.current.current - scroll.current.cache;
      scroll.current.cache = scroll.current.current;

      leftColumnRef.current.style.transform = `skewY(${clamp(
        distance,
        -10,
        10
      )}deg)`;
      middleColumnRef.current.style.transform = `skewY(${clamp(
        -distance,
        -10,
        10
      )}deg)`;
      rightColumnRef.current.style.transform = `skewY(${clamp(
        distance,
        -10,
        10
      )}deg)`;
    });

    Promise.all([preloadImages('.grid-item-media')]).then(() => {
      scrollELement.update();
    });
  }, []);

  const leftChunk = [...photos].splice(0, 5);
  const middleChunk = [...photos].splice(5, 5);
  const rightChunk = [...photos].splice(10, 5);

  return (
    <div
      className={classes['main-container']}
      id='main-container'
      data-scroll-container
      ref={ref}
    >
      <div className={classes['grid-wrap']}>
        <div className={classes['left-column']} ref={leftColumnRef}>
          {leftChunk.map(({ url, description }, index) => (
            <GridItem url={url} description={description} key={url} />
          ))}
        </div>
        <div
          className={classes['middle-column']}
          data-scroll
          data-scroll-speed='-20'
        >
          <div ref={middleColumnRef}>
            {middleChunk.map(({ url, description }, index) => (
              <GridItem url={url} description={description} key={url} />
            ))}
          </div>
        </div>
        <div className={classes['right-column']} ref={rightColumnRef}>
          {rightChunk.map(({ url, description }, index) => (
            <GridItem url={url} description={description} key={url} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
