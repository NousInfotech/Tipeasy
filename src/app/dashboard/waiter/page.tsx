// app/dashboard/waiter/page.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function WaiterDashboard() {
    return (
        <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div>

                <Typography variant="h4">Waiter Dashboard</Typography>
                <Typography variant="body1">Manage your tips and notifications here.</Typography>
            </div>
        </Box>
    );
}
