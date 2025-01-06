'use client'

import React, { useEffect } from "react";
import Chart from "chart.js";


interface SimpleLineChartProps {
    chartId: string; // Unique ID for the canvas element
    title: string; // Title of the chart
    data: { amount: number; date: string }[]; // Array of objects with amount and date
    borderColor: string; // Color for the line border
    backgroundColor: string; // Background color for the line area
}

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({
    chartId,
    title,
    data,
    borderColor,
    backgroundColor,
}) => {
    useEffect(() => {
        const ctx = document.getElementById(chartId) as HTMLCanvasElement;
        if (!ctx) return;

        // Extract labels and amounts from the data
        const labels = data.map((item) => item.date);
        const amounts = data.map((item) => item.amount);

        new Chart(ctx.getContext("2d") as CanvasRenderingContext2D, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: title,
                        data: amounts,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        fill: false,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    labels: {
                        fontColor: "#000000", // Black font color for legend
                    },
                    position: "bottom",
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark tooltip background for contrast
                    titleFontColor: "#ffffff", // White font for tooltip title
                    bodyFontColor: "#ffffff", // White font for tooltip content
                },
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: "#000000", // Black font color for X-axis
                            },
                            gridLines: {
                                display: false, // No grid lines for X-axis
                                color: "rgba(33, 37, 41, 0.3)",
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontColor: "#000000", // Black font color for Y-axis
                                padding: 10,
                                stepSize: 10
                            },
                            gridLines: {
                                drawBorder: true, // Black border for Y-axis grid lines
                                color: "rgba(0, 0, 0, 0.1)", // Light black for Y-axis grid lines
                            },
                        },
                    ],
                },
            },
        });

    }, [chartId, title, data, borderColor, backgroundColor]);

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        {/* <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                            Overview
                        </h6> */}
                        <h2 className="text-primary text-xl font-semibold">{title}</h2>
                    </div>
                </div>
            </div>
            <div className="p-4 flex-auto">
                <div className="relative h-[300px]">
                    <canvas id={chartId}></canvas>
                </div>
            </div>
        </div>
    );
};

export default SimpleLineChart;
