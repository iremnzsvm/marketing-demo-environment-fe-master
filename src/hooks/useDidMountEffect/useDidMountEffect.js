import React from 'react';

const useDidMountEffect = ( effect, dependencies ) => {
  const mounted = React.useRef( false );
  React.useEffect( () => {
    if (mounted.current) {
      const unmount = effect();
      return () => {
        mounted.current = false;
        unmount && unmount();
      };
    } else {
      mounted.current = true;
    }
  }, dependencies );
};

export default useDidMountEffect;
