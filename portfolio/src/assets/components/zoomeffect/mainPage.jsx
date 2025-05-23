import React, { useEffect } from 'react'
import Home from '../home'
import ZoomTransition from './zoomeffect'
import { useState } from 'react';
import Sections from '../sections/sections';
function MainPage() {
      const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    
     <ZoomTransition isLoading={isLoading}>
        <Sections/> 
    </ZoomTransition>
  )
}

export default MainPage

