import { useState, useEffect } from 'react';

const useScrollVisibility = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setScrollDirection('down');
      } else if (scrollTop < lastScrollTop) {
        setScrollDirection('up');
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  return scrollDirection;
};

export default useScrollVisibility;
