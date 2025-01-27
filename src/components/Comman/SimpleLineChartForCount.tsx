'use client'

import React, { useEffect } from "react";
import Chart from "chart.js";

interface SimpleLineChartForCountProps {
    chartId: string; // Unique ID for the canvas element
    title: string; // Title of the chart
    data: { date: string; count: number }[]; // Array of objects with date and count of tippings
    borderColor: string; // Color for the line border
    backgroundColor: string; // Background color for the line area
}

const SimpleLineChartForCount: React.FC<SimpleLineChartForCountProps> = ({
    chartId,
    title,
    data,
    borderColor,
    backgroundColor,
}) => {
    useEffect(() => {
        const ctx = document.getElementById(chartId) as HTMLCanvasElement;
        if (!ctx) return;

        // Extract labels (dates) and counts from the data
        const labels = data.map((item) => item.date);
        const counts = data.map((item) => item.count);

        new Chart(ctx.getContext("2d") as CanvasRenderingContext2D, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: title,
                        data: counts,
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
                                stepSize: 1 // Step size 1 for count
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

export default SimpleLineChartForCount;
