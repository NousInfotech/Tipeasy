'use client'

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SimpleLineChart from '@/components/Comman/SimpleLineChart';
import { orders, tippings } from '@/Mockdata/LineData';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';

// TabPanelProps interface to define the props for the tab panel
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// CustomTabPanel component to handle the content display based on selected tab
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
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
}

// a11yProps function to set up the accessibility properties for tabs
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// RestaurantStatistics component to manage tab switching and display the appropriate content
const RestaurantStatistics = () => {
  const [value, setValue] = React.useState(0);

  // handleChange function to update the selected tab value
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (

    <section>
      <HeaderwithBackButton heading='Go back' />
      <Box sx={{ width: '100%' }}>
        {/* Tabs Container */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Tippings" {...a11yProps(0)} />
            <Tab label="Orders" {...a11yProps(1)} />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <CustomTabPanel value={value} index={0}>
          <SimpleLineChart
            data={tippings} // Array of tipping data
            title="Tipping Chart"
            chartId={'1'}
            borderColor={'green'}
            backgroundColor={'white'}
          // isOrders={false} // Determines the chart type
          // initialTimePeriod="daily" // Initial filter
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <SimpleLineChart
            data={orders} // Array of tipping data
            title="Tipping Chart"
            chartId={'1'}
            borderColor={'green'}
            backgroundColor={'white'}
          // isOrders={false} // Determines the chart type
          // initialTimePeriod="daily" // Initial filter
          />
        </CustomTabPanel>
      </Box>
    </section>
  );
}

export default RestaurantStatistics;
