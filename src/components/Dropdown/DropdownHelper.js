import { useState, useEffect } from 'react';

export const useDetectOutsideClick = (el, initialState) => {
  const [is_active, set_is_active] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (el.current !== null && !el.current.contains(e.target)) {
        set_is_active(!is_active);
      };
    };

    if (is_active) {
      window.addEventListener('click', pageClickEvent);
    };

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [is_active, el]);

  return [is_active, set_is_active];
};