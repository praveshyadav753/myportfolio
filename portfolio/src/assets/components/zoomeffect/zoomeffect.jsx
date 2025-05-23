import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingPage from '../loading/Loadingpage.jsx';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function ZoomTransition({ children, isLoading }) {
  const [animationPhase, setAnimationPhase] = useState('loading');
  const splineContainerRef = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      setAnimationPhase('zooming');
    } else {
      setAnimationPhase('loading');
    }
  }, [isLoading]);

  useEffect(() => {
    if (splineContainerRef.current) {
      splineContainerRef.current.style.backgroundColor = 'black';
    }
  }, []);

  return (
    <>
      {/* Loading Screen - Properly animated exit */}
      <AnimatePresence>
        {animationPhase === 'loading' && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.3 }
            }}
            className="fixed inset-0 z-50"
          >
            <LoadingPage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spline Transition */}
      <motion.div
        ref={splineContainerRef}
        className="fixed inset-0 z-40 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: animationPhase === 'zooming' ? 1 : 0,
                  transition: { 
            duration: 0.4,
            ease: [0, 0, 0.1, 0 ]
          }
        }}
      >
        <Suspense fallback={null}>
          {animationPhase === 'zooming' && (
            <div className="w-screen h-screen  bg-black"> 
            <Spline 
              scene="https://prod.spline.design/X66OjbKavXxrRMqr/scene.splinecode"
              onLoad={() => { setTimeout(() => setAnimationPhase('complete'), 800);}}
            />
            </div>
          )}
        </Suspense>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: animationPhase === 'complete' ? 1 : 0,
          transition: { 
            duration: 0.6,
            delay: 0.2
          }
        }}
        className="relative z-30"
      >
        {children}
      </motion.div>
    </>
  );
}