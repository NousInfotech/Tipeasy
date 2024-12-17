'use client'

import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { AppProvider } from '@toolpad/core/AppProvider';
import { NAVIGATION_BY_ROLE } from '@/utils/constants';
import { createTheme } from '@mui/material';
import Cookie from 'js-cookie';
import { usePathname } from 'next/navigation';



type Role = 'superadmin' | 'admin' | 'waiter';

export default function DashboardPagesLayout(props: { children: React.ReactNode }) {

    const role = Cookie.get('userRole');
    const pathname = usePathname();

    const theme = createTheme({
        palette: {
            primary: {
                main: '#98B03C',
                // light: will be calculated from palette.primary.main,
                // dark: will be calculated from palette.primary.main,
                // contrastText: will be calculated to contrast with palette.primary.main
            },
            secondary: {
                main: '#E0C2FF',
                light: '#F5EBFF',
                // dark: will be calculated from palette.secondary.main,
                contrastText: '#47008F',
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
