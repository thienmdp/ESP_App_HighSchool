import React, { useRef, useEffect } from 'react';

export function CustomSPO2Chart({ data }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Set up chart area
        const chartArea = { left: 40, top: 20, right: width - 20, bottom: height - 40 };
        const chartWidth = chartArea.right - chartArea.left;
        const chartHeight = chartArea.bottom - chartArea.top;

        // Draw axes
        ctx.beginPath();
        ctx.moveTo(chartArea.left, chartArea.top);
        ctx.lineTo(chartArea.left, chartArea.bottom);
        ctx.lineTo(chartArea.right, chartArea.bottom);
        ctx.stroke();

        // Draw y-axis labels
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000';
        for (let i = 0; i <= 100; i += 20) {
            const y = chartArea.bottom - (i / 100) * chartHeight;
            ctx.fillText(i.toString(), chartArea.left - 5, y);
        }

        // Draw data
        const barWidth = chartWidth / data.length * 0.6;
        data.forEach((item, index) => {
            const x = chartArea.left + (index + 0.5) * (chartWidth / data.length);

            // Only draw if there's data
            if (item.min > 0 && item.max > 0) {
                const yMax = chartArea.bottom - (item.max / 100) * chartHeight;
                const yMin = chartArea.bottom - (item.min / 100) * chartHeight;

                // Draw bar with light blue color
                ctx.fillStyle = 'rgba(135, 206, 235, 0.7)'; // Light sky blue with some transparency
                ctx.fillRect(x - barWidth / 2, yMax, barWidth, yMin - yMax);

                // Draw min and max values
                ctx.fillStyle = '#000';
                ctx.textAlign = 'center';
                ctx.fillText(item.max.toString(), x, yMax - 5);
                ctx.fillText(item.min.toString(), x, yMin + 15);

                // Draw date
                ctx.fillText(item.date, x, chartArea.bottom + 15);
            }
        });
    }, [data]);

    return <canvas ref={canvasRef} width={600} height={300} />;
}


