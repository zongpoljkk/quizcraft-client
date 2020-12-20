import ResizeObserver from "resize-observer-polyfill";
import { useState, useLayoutEffect, useCallback } from "react";

export const useCallbackRef = () => {
  const [ref, setRef] = useState(null);
  const fn = useCallback(node => {
    setRef(node);
  }, []);

  return [ref, fn];
}

export const useMeasure = () => {
  const [element, attachRef] = useCallbackRef();
  const [bounds, setBounds] = useState({});

  useLayoutEffect(() => {
    function onResize([entry]) {
      setBounds({
        height: entry.contentRect.height,
        width: entry.contentRect.width
      });
    }

    const observer = new ResizeObserver(onResize);

    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [element]);

  return {
    bounds,
    ref: attachRef
  };
}
