"use client";
import * as d3 from "d3";

type BackgroundCircleProps = {
  centerY: number;
  strokeWidth: number;
  fill: string;
  strokeColor: string;
};

function BackgroundCircle({
  centerY,
  strokeWidth,
  fill,
  strokeColor,
}: BackgroundCircleProps) {
  return (
    <circle
      fill={fill}
      r={centerY - strokeWidth / 2}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
    />
  );
}

export default function Smiley() {
  const width = 960;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;
  const strokeWidth = 10;
  const eyeOffsetX = 90;
  const eyeOffsetY = 100;
  const eyeRadius = 50;
  const mouthWidth = 20;
  const mouthRadius = 140;

  const arc = d3.arc();

  const mouthArc =
    arc({
      innerRadius: mouthRadius,
      outerRadius: mouthRadius + mouthWidth,
      startAngle: Math.PI / 2,
      endAngle: (Math.PI * 3) / 2,
    }) || "";

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        <BackgroundCircle
          centerY={centerY}
          strokeWidth={strokeWidth}
          fill="yellow"
          strokeColor="black"
        />
        <circle cx={-eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} />
        <circle cx={eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} />
        <path d={mouthArc} />
      </g>
    </svg>
  );
}
