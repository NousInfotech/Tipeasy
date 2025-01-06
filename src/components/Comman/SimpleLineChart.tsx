'use client'

import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { ThemeProvider, createTheme } from '@mui/material/styles';

type ChartData = {
    amount: number;
    date: string; // ISO string or any date format
    time?: string; // Optional: for hourly data
};

type SimpleLineChartProps = {
    data: ChartData[]; // The data (either tippings or orders)
    width?: number;
    height?: number;
    isOrders?: boolean; // Prop to decide whether to render the order chart
    initialTimePeriod?: 'daily' | 'monthly' | 'yearly'; // Initial time period for grouping the data
};

// Function to group data by the selected time period
const processData = (data: ChartData[], period: 'daily' | 'monthly' | 'yearly') => {
    return data.reduce((acc, { amount, date }) => {
        const dateObj = new Date(date);
        let dateKey: string;

        switch (period) {
            case 'daily':
                dateKey = dateObj.toLocaleDateString(); // Group by day
                break;
            case 'monthly':
                dateKey = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}`; // Group by month
                break;
            case 'yearly':
                dateKey = `${dateObj.getFullYear()}`; // Group by year
                break;
            default:
                dateKey = dateObj.toLocaleDateString();
        }

        if (!acc[dateKey]) {
            acc[dateKey] = 0;
        }

        acc[dateKey] += 1; // Count each entry (for orders)
        return acc;
    }, {} as Record<string, number>);
};

// Create a light theme
const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

export default function SimpleLineChart({
    data,
    width = 500,
    height = 300,
    isOrders = false,
    initialTimePeriod = 'daily',
}: SimpleLineChartProps) {
    const [timePeriod, setTimePeriod] = React.useState(initialTimePeriod); // State to manage time period

    const processedData = processData(data, timePeriod);

    // Extract the X-axis labels (unique time periods: days, months, or years)
    const xLabels = Object.keys(processedData).sort();

    return (
        <ThemeProvider theme={theme}>
            <div>
                {/* Time Period Toggle */}
                <div>
                    <button onClick={() => setTimePeriod('daily')}>Daily</button>
                    <button onClick={() => setTimePeriod('monthly')}>Monthly</button>
                    <button onClick={() => setTimePeriod('yearly')}>Yearly</button>
                </div>

                {/* Render either Tipping Chart or Order Chart based on isOrders prop */}
                <h2>{isOrders ? 'Order Chart' : 'Tipping Chart'}</h2>
                <LineChart
                    width={width}
                    height={height}
                    series={[
                        {
                            data: xLabels.map((label) => processedData[label] || 0),
                            label: isOrders ? 'Orders' : 'Tippings',
                            color: "green",
                        },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                />
            </div>
        </ThemeProvider>
    );
}
