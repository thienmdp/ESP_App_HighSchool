import React from 'react';
import moment from 'moment';

const SleepStageChart = ({ data }) => {
  const chartWidth = 800;
  const chartHeight = 200;
  const marginTop = 40;
  const marginBottom = 40;
  const marginLeft = 70;
  const marginRight = 20;

  console.log("Received data:", data); // Log dữ liệu đầu vào

  if (!data || !data.stages || data.stages.length === 0) {
    return <p>Không có dữ liệu giấc ngủ.</p>;
  }

  const startTime = moment(data.stages[0].startTime);
  const endTime = moment(data.stages[data.stages.length - 1].endTime);
  const duration = endTime.diff(startTime, 'minutes');

  console.log("Start time:", startTime.format());
  console.log("End time:", endTime.format());
  console.log("Duration:", duration, "minutes");

  const getY = (stage) => {
    switch (stage) {
      case 1: return 0; // Awake
      case 4: return 50; // Light sleep
      case 5: return 100; // Deep sleep
      case 6: return 150; // REM
      default: return 0;
    }
  };

  const getColor = (stage) => {
    switch (stage) {
      case 1: return 'red';
      case 4: return 'purple';
      case 5: return 'blue';
      case 6: return 'lightblue';
      default: return 'gray';
    }
  };

  const renderStages = () => {
    return data.stages.map((stage, index) => {
      const startX = moment(stage.startTime).diff(startTime, 'minutes') / duration * chartWidth;
      const endX = moment(stage.endTime).diff(startTime, 'minutes') / duration * chartWidth;
      const width = endX - startX;
      const y = getY(stage.stage);
      const color = getColor(stage.stage);

      console.log(`Stage ${index}:`, { startX, endX, width, y, color, stage: stage.stage });

      return (
        <rect
          key={index}
          x={startX + marginLeft}
          y={y + marginTop}
          width={Math.max(width, 1)} // Đảm bảo width luôn lớn hơn 0
          height={50}
          fill={color}
        />
      );
    });
  };

  const renderTimeAxis = () => {
    const hours = [];
    let currentHour = startTime.clone().startOf('hour');
    while (currentHour.isBefore(endTime)) {
      hours.push(currentHour.clone());
      currentHour.add(1, 'hour');
    }

    return hours.map((hour, index) => {
      const x = hour.diff(startTime, 'minutes') / duration * chartWidth + marginLeft;
      return (
        <g key={index}>
          <line
            x1={x}
            y1={marginTop}
            x2={x}
            y2={chartHeight + marginTop}
            stroke="#e0e0e0"
            strokeWidth="1"
          />
          <text
            x={x}
            y={chartHeight + marginTop + 20}
            textAnchor="middle"
            fontSize="12"
            fill="#666"
          >
            {hour.format('HH:mm')}
          </text>
        </g>
      );
    });
  };

  const renderYAxis = () => {
    const stages = ['Thức', 'Ngủ nhẹ', 'Ngủ sâu', 'REM'];
    return stages.map((stage, index) => {
      const y = index * 50 + marginTop;
      return (
        <g key={index}>
          <line
            x1={marginLeft}
            y1={y}
            x2={chartWidth + marginLeft}
            y2={y}
            stroke="#e0e0e0"
            strokeWidth="1"
          />
          <text
            x={marginLeft - 10}
            y={y + 25}
            textAnchor="end"
            fontSize="12"
            fill="#666"
          >
            {stage}
          </text>
        </g>
      );
    });
  };

  return (
    <svg width={chartWidth + marginLeft + marginRight} height={chartHeight + marginTop + marginBottom}>
      {/* Trục Y */}
      <line
        x1={marginLeft}
        y1={marginTop}
        x2={marginLeft}
        y2={chartHeight + marginTop}
        stroke="#666"
        strokeWidth="2"
      />

      {/* Trục X */}
      <line
        x1={marginLeft}
        y1={chartHeight + marginTop}
        x2={chartWidth + marginLeft}
        y2={chartHeight + marginTop}
        stroke="#666"
        strokeWidth="2"
      />

      {renderYAxis()}
      {renderTimeAxis()}
      {renderStages()}

      <text x={marginLeft} y={25} fontSize="16" fontWeight="bold" fill="#333">Các giai đoạn ngủ</text>
    </svg>
  );
};

export default SleepStageChart;
