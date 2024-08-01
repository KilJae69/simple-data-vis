"use client";

import { useState,useCallback } from "react";

export default function MouseFollower() {
  const width = 960;
  const height = 500;
//   const circleX = width / 2;
//   const circleY = height / 2;
  const radius = 10;
  const initialMousePosition = {x:width /2, y: height/2}
  const [mousePosition, setMousePosition] = useState(initialMousePosition)

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const { clientX, clientY } = e;
    setMousePosition({x:clientX, y:clientY}) 
  },[setMousePosition])
  return (
    <svg width={width} height={height} onMouseMove={handleMouseMove}>
      <circle fill="black" cx={mousePosition.x } cy={mousePosition.y -20} r={radius} />
    </svg>
  );
}
