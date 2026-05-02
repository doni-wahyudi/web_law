import React from 'react';
import './Skeleton.css';

const Skeleton = ({ type = 'text', width, height, style }) => {
  const classes = `skeleton skeleton--${type}`;
  
  return (
    <div 
      className={classes} 
      style={{ 
        width: width || undefined, 
        height: height || undefined,
        ...style 
      }} 
    />
  );
};

export const CardSkeleton = () => (
  <div className="skeleton-card-container">
    <Skeleton type="image" />
    <Skeleton type="title" />
    <Skeleton type="text" />
    <Skeleton type="text" width="60%" />
  </div>
);

export default Skeleton;
