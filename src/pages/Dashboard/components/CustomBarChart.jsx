import React, { useRef, useEffect } from 'react';

export function CustomHeartRateChart({ data }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw title
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';

        // Set up chart area
        const chartArea = { left: 40, top: 40, right: width - 20, bottom: height - 40 };
        const chartWidth = chartArea.right - chartArea.left;
        const chartHeight = chartArea.bottom - chartArea.top;

        // Draw y-axis
        ctx.beginPath();
        ctx.moveTo(chartArea.left, chartArea.top);
        ctx.lineTo(chartArea.left, chartArea.bottom);
        ctx.stroke();
        // Draw x-axis
        ctx.beginPath();
        ctx.moveTo(chartArea.left, chartArea.bottom);
        ctx.lineTo(chartArea.right, chartArea.bottom);
        ctx.stroke();

        // Draw y-axis labels
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        for (let i = 30; i <= 130; i += 25) {
            const y = chartArea.bottom - (i - 30) / (130 - 30) * chartHeight;
            ctx.fillText(i.toString(), chartArea.left - 5, y);
        }

        // Draw data
        const barWidth = chartWidth / data.length * 0.6;
        data.forEach((item, index) => {
            const x = chartArea.left + (index + 0.5) * (chartWidth / data.length);
            const yMax = chartArea.bottom - (item.max - 30) / (130 - 30) * chartHeight;
            const yMin = chartArea.bottom - (item.min - 30) / (130 - 30) * chartHeight;

            // Draw bar with rounded corners
            ctx.fillStyle = '#FFA500';
            const radius = 25; // Adjust this value to change the roundness
            const height = yMin - yMax;

            ctx.beginPath();
            ctx.moveTo(x - barWidth / 2 + radius, yMax);
            ctx.lineTo(x + barWidth / 2 - radius, yMax);
            ctx.quadraticCurveTo(x + barWidth / 2, yMax, x + barWidth / 2, yMax + radius);
            ctx.lineTo(x + barWidth / 2, yMax + height - radius);
            ctx.quadraticCurveTo(x + barWidth / 2, yMax + height, x + barWidth / 2 - radius, yMax + height);
            ctx.lineTo(x - barWidth / 2 + radius, yMax + height);
            ctx.quadraticCurveTo(x - barWidth / 2, yMax + height, x - barWidth / 2, yMax + height - radius);
            ctx.lineTo(x - barWidth / 2, yMax + radius);
            ctx.quadraticCurveTo(x - barWidth / 2, yMax, x - barWidth / 2 + radius, yMax);
            ctx.closePath();
            ctx.fill();

            // Draw min and max values
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.fillText(item.max.toString(), x, yMax - 5);
            ctx.fillText(item.min.toString(), x, yMin + 15);

            // Draw date
            ctx.fillText(item.date, x, chartArea.bottom + 15);
        });
    }, [data]);

    return <canvas ref={canvasRef} width={600} height={400} />;
}



