import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const prevStateRef = useRef(location.state);

  useEffect(() => {
    const pathChanged = location.pathname !== prevPathRef.current;
    const isModalNavigation =
      location.state?.background || prevStateRef.current?.background;

    // Only scroll when a real route navigation happens (not a modal or slug modal close)
    if (pathChanged && !isModalNavigation) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    prevPathRef.current = location.pathname;
    prevStateRef.current = location.state;
  }, [location]);

  return null;
};

export default ScrollToTop;
