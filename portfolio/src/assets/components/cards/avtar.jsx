// src/components/Avatar.jsx
import React from 'react';
// If you have a 3D avatar, you might render it here with @react-three/fiber
// For now, it's a simple placeholder
const Avatar = () => {
  return (
    <div className="w-24 h-24  rounded-full flex items-center justify-center text-white text-xs">
      {/* Replace with your 3D avatar render or image */}
      <img src="aavatar.svg" alt="" />
    </div>
  );
};

export default Avatar;