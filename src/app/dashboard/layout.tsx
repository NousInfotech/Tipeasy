'use client'

import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { AppProvider } from '@toolpad/core/AppProvider';
import { NAVIGATION_BY_ROLE } from '@/utils/constants';
import { createTheme } from '@mui/material'; 
import Cookie from 'js-cookie';



type Role = 'superadmin' | 'admin' | 'waiter';

export default function DashboardPagesLayout(props: { children: React.ReactNode }) {

    const role = Cookie.get('userRole');

    const theme = createTheme({
        
        palette: {
            primary: {
                main: '#98B03C',
            },
        },
    });


    const NAVIGATION = NAVIGATION_BY_ROLE[role as Role];

    return (
        <AppProvider navigation={NAVIGATION} branding={{
            logo: <div></div>,
            title: 'Tip Easyy',
        }}
            theme={theme}
        >
            <div>
                <DashboardLayout >
                    <PageContainer>{props.children}</PageContainer>
                </DashboardLayout>
            </div>
        </AppProvider>
    );
}
