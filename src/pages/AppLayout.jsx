import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import LoadingScreen from "../components/animations/LoadingScreen";

const AppLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    
    setIsLoading(true);

    
    const initialLoadTimer = setTimeout(() => setIsLoading(false), 1000);

    return () => clearTimeout(initialLoadTimer);
  }, []);

  useEffect(() => {
    
    setIsLoading(true);
    const routeChangeTimer = setTimeout(() => setIsLoading(false), 1000); 
    return () => clearTimeout(routeChangeTimer);
  }, [location]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className={!isLoading ? 'flex-1' : 'hidden'}>
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
