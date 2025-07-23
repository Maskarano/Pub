
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  const cardClassName = `bg-gray-800 shadow-lg rounded-lg overflow-hidden ${className}`;
  return <div className={cardClassName}>{children}</div>;
};

export default Card;
