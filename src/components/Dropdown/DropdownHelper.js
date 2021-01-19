import { useState, useEffect } from 'react';

export const useDetectOutsideClick = (ref, initialState) => {
  const [is_active, set_is_active] = useState(initialState);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        set_is_active(!is_active);
      };
    };

    if (is_active) window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [is_active, ref]);

  return [is_active, set_is_active];
};