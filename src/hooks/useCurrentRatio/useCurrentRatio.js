import { useEffect, useState } from 'react';

const getWidth = () => window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

const getHeight = () => window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

function useCurrentRatio() {
  // save current window width in the state object
  const [height, setHeight] = useState( getHeight() / getWidth() );

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect( () => {
    // timeoutId for debounce mechanism
    let timeoutId = null;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout( timeoutId );
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout( () => setHeight( getHeight() / getWidth() ), 150 );
    };
    // set resize listener
    window.addEventListener( 'resize', resizeListener );

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener( 'resize', resizeListener );
    };
  }, [] );

  return height;
}

export default useCurrentRatio;
