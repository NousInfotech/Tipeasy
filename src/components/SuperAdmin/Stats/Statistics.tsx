'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SimpleLineChart from '@/components/Comman/SimpleLineChart';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';
import SimpleLineChartForCount from '@/components/Comman/SimpleLineChartForCount';
import { getAllTippings } from '@/api/tippingsApi';
import { formatOrderDataForChart, formatTippingDataForChart } from '@/utils/formatData';
import { IFormattedChartData, IOrder, ITipping } from '@/types/schematypes';
import { getMenuOrders } from '@/api/orderApi';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const Statistics: React.FC = () => {
  const [value, setValue] = useState(0);
  const [tippings, setTippings] = useState<IFormattedChartData[]>([]);
  const [orders, setOrders] = useState<IFormattedChartData[]>([]);

  const fetchTippings = useCallback(async () => {
    try {
      const data = (await getAllTippings({ cache: 'no-store' })) as ITipping[];
      setTippings(formatTippingDataForChart(data));
    } catch (error) {
      console.error('Error fetching tippings:', error);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const data = (await getMenuOrders({ cache: 'no-store' })) as IOrder[];
      setOrders(formatOrderDataForChart(data));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, []);

  useEffect(() => {
    fetchTippings();
    fetchOrders();
  }, [fetchTippings, fetchOrders]);

  const tippingChartData = useMemo(
    () =>
      Object.entries(
        tippings.reduce<{ [key: string]: number }>((acc, { date }) => {
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {})
      ).map(([date, count]) => ({ date, count })),
    [tippings]
  );

  const ordersChartData = useMemo(
    () =>
      Object.entries(
        orders.reduce<{ [key: string]: number }>((acc, { date }) => {
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {})
      ).map(([date, count]) => ({ date, count })),
    [orders]
  );

  return (
    <section>
      <HeaderwithBackButton heading="Go back" />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={(_, newValue) => setValue(newValue)} aria-label="Statistics Tabs">
            <Tab label="Tippings" {...a11yProps(0)} />
            <Tab label="Orders" {...a11yProps(1)} />
            <Tab label="Tipping Counts" {...a11yProps(2)} />
            <Tab label="Orders Count" {...a11yProps(3)} />
          </Tabs>
        </Box>

        {[
          { component: <SimpleLineChart data={tippings} title="Tipping Chart" chartId="1" borderColor="rgb(152 176 60)" backgroundColor="white" />, index: 0 },
          { component: <SimpleLineChart data={orders} title="Order Chart" chartId="2" borderColor="rgb(152 176 60)" backgroundColor="white" />, index: 1 },
          { component: <SimpleLineChartForCount chartId="tipping-count-chart" title="Tipping Counts" data={tippingChartData} borderColor="rgb(152 176 60)" backgroundColor="white" />, index: 2 },
          { component: <SimpleLineChartForCount chartId="orders-count-chart" title="Order Counts" data={ordersChartData} borderColor="rgb(152 176 60)" backgroundColor="white" />, index: 3 }
        ].map(({ component, index }) => (
          <CustomTabPanel key={index} value={value} index={index}>
            {component}
          </CustomTabPanel>
        ))}
      </Box>
    </section>
  );
};

export default Statistics;
