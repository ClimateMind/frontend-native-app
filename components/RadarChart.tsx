import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Text, Circle, Line } from 'react-native-svg';

type Props = {
  data: number[],
  size: number,
  labels: string[],
};

type Point = {
  x: number,
  y: number,
};

type Axis = {
  point1: Point,
  point2: Point,
  labelPoint: Point,
};

function RadarChart(props: Props) {
  const { data, size, labels } = props;

  const strokeColor = "#61dafb";
  const strokeWidth = 2;
  const axisColor="#000";
  const axisLabelColor="#666";
  
  const center = size / 2;
  const radius = size / 2 - 50;
  const angle = (2 * Math.PI) / data.length;

  // Calculate points for each data point
  const dataPoints: Point[] = data.map((value, index) => {
    const r = (value / 10) * radius;
    const a = angle * index;
    const x = center + r * Math.sin(a);
    const y = center - r * Math.cos(a);
    return { x, y };
  });

  // Calculate axes and axis labels
  const axes: Axis[] = dataPoints.map((point, index) => {
    const a = angle * index;
    const x = center + radius * Math.sin(a);
    const y = center - radius * Math.cos(a);
    const labelOffset = 25;
    const labelPoint = {
      x: center + (radius + labelOffset) * Math.sin(a),
      y: center - (radius + labelOffset) * Math.cos(a),
    };

    // Adjust label position if it exceeds the bounds
    let labelX = labelPoint.x;
    let labelY = labelPoint.y;

    // Check if label exceeds the X bounds
    if (labelPoint.x < labelOffset) {
      labelX = labelOffset;
    } else if (labelPoint.x > size - labelOffset) {
      labelX = size - labelOffset;
    }

    // Check if label exceeds the Y bounds
    if (labelPoint.y < labelOffset) {
      labelY = labelOffset;
    } else if (labelPoint.y > size - labelOffset) {
      labelY = size - labelOffset;
    }

    return {
      point1: { x: center, y: center },
      point2: { x, y },
      labelPoint: { x: labelX, y: labelY },
    };

  });

  const webLines = [];
  for (let i = 1; i <= 5; i++) {
    const webPoints = dataPoints.map((point, index) => {
      const r = (i / 5) * radius;
      const a = angle * index;
      const x = center + r * Math.sin(a);
      const y = center - r * Math.cos(a);
      return { x, y };
    });
    const webPath = webPoints.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`).join(' ') + 'Z';
    webLines.push(
      <Path
        key={i}
        d={webPath}
        fill="none"
        stroke={axisColor}
        strokeWidth={strokeWidth / 2}
        strokeOpacity={0.5}
      />
    );
  }

  return (
    <View>
      <Svg width={size} height={size}>
        {axes.map((axis, index) => (
          <Line
            key={index}
            x1={axis.point1.x}
            y1={axis.point1.y}
            x2={axis.point2.x}
            y2={axis.point2.y}
            stroke={axisColor}
            strokeWidth={strokeWidth}
          />
        ))}

        {dataPoints.map((point, index) => (
          <Line
            key={index}
            x1={point.x}
            y1={point.y}
            x2={center}
            y2={center}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        ))}
        {axes.map((axis, index) => (
          <Text
            key={index}
            x={axis.labelPoint.x}
            y={axis.labelPoint.y}
            fill={axisLabelColor}
            fontSize={12}
            fontWeight="bold"
            fontFamily="Arial"
            textAnchor="middle"
          >
            {labels[index]}
          </Text>
        ))}
        {dataPoints.map((point, index) => (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={6}
            fill={strokeColor}
            strokeWidth={0}
          />
        ))}
        {dataPoints.length > 0 && (
          <Path
            d={`
              M${dataPoints[0].x},${dataPoints[0].y}
              ${dataPoints.map((point) => `L${point.x},${point.y}`).join(' ')}
              L${dataPoints[0].x},${dataPoints[0].y}
            `}
            fill={strokeColor}
            fillOpacity={0.2}
            stroke={strokeColor}
            strokeWidth={2}
          />
        )}
      </Svg>
    </View>
  );
  

}

export default RadarChart;