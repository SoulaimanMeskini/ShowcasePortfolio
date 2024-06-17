import { useState, useEffect } from 'react';

const useScrollVisibility = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return scrollDirection;
};

export default useScrollVisibility;
