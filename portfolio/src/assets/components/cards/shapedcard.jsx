// src/components/ShapedCard.jsx
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useInView } from 'react-intersection-observer'; // Import useInView
import './shapecard.css';

// Reusable component for the base card shape
const ShapedCard = ({
  width = 320, // Default width
  height = 'auto', // Auto height, or provide specific height
  title,       // Text for the tab
  children,    // Content inside the card
  className = 'cardmain', 
  cardBgColor = '#ADD8E6', // Light blue background color
  cardBorderColor = '#00C8FF', // Bright blue border color
  tabBgColor = '#007bff', // Default blue for tab background
  tabTextColor = '#ffffff', // Default white for tab text
  tabPadding = 'px-4 py-2', // Tailwind classes for tab padding
}) => {
  const [showGlow, setShowGlow] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false, // We want the glow to activate/deactivate
    threshold: 0.2,    // Trigger when 20% of the element is visible
  });

  useEffect(() => {
    // Activate glow when in view, deactivate when out of view
    setShowGlow(inView);
  }, [inView]);

  // --- SVG Path Definitions (Approximated for example) ---
  const mainCardPath = `M20 0 L${width - 20} 0 L${width} 20 L${width} ${height} L0 ${height} L0 20 Z`;
  const tabHeight = 30;
  const tabWidth = 100;
  const tabPath = `M0 0 L${tabWidth - (tabHeight / 2)} 0 L${tabWidth} ${tabHeight} L0 ${tabHeight} Z`;

  // Unique ID for SVG filters (important if multiple cards are on the page)
  const uniqueId = title ? title.replace(/\s/g, '-') : 'shaped-card';

  return (
    <div
      ref={ref} // Attach ref to the outermost div for glow detection
      className={`relative carddiv w-[340px] sm:w-[380px] md:w-[430px] lg:w-[500px]   ${className}`}
      style={{
       
        height: height === 'auto' ? 'auto' : `${height}px`,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height === 'auto' ? 1 : height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
        preserveAspectRatio="none"
      >
        {/* Define SVG filter for neon glow */}
        {showGlow && (
          <defs>
            <filter id={`neon-glow-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feFlood floodColor={cardBorderColor} floodOpacity="1" result="flood" />
              <feComposite in="flood" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        )}

        {/* Main Card Background */}
        <path
          d={mainCardPath}
          fill={cardBgColor}
          fillOpacity="0.5"
        />
        {/* Main Card Border - Apply filter for neon glow */}
        <path
          d={mainCardPath}
          stroke={cardBorderColor}
          strokeWidth="2"
          filter={showGlow ? `url(#neon-glow-${uniqueId})` : ''}
        />
      </svg>

      {/* SVG for the Tab background and border */}
      {title && (
        <svg
          width={tabWidth}
          height={tabHeight}
          viewBox={`0 0 ${tabWidth} ${tabHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0"
          style={{ transform: `translateY(-${tabHeight / 2}px)` }}
          preserveAspectRatio="none"
        >
          {/* Define SVG filter for neon glow (for tab) */}
          {showGlow && (
            <defs>
              <filter id={`neon-glow-tab-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                <feFlood floodColor={cardBorderColor} floodOpacity="1" result="flood" />
                <feComposite in="flood" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          )}
          <path
            d={tabPath}
            fill={tabBgColor}
          />
          <path
            d={tabPath}
            stroke={cardBorderColor}
            strokeWidth="2"
            filter={showGlow ? `url(#neon-glow-tab-${uniqueId})` : ''}
          />
        </svg>
      )}

      {/* HTML Content Overlay */}
      <div
        className="absolute inset-0 p-6 pb-2 flex flex-col"
        style={{ paddingTop: title ? `${tabHeight / 2 + 10}px` : '1.5rem' }}
      >
        {title && (
          <div
            className={`absolute top-0 left-0 flex items-center justify-center font-bold text-sm ${tabTextColor} ${tabPadding}`}
            style={{
              width: `${tabWidth}px`,
              height: `${tabHeight}px`,
              transform: `translateY(-${tabHeight / 2}px)`,
            }}
          >
            {title}
          </div>
        )}
        <div className="flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ShapedCard;