'use client'

import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { AppProvider } from '@toolpad/core/AppProvider';
import { NAVIGATION_BY_ROLE } from '@/utils/constants';
import { createTheme } from '@mui/material';
import Cookie from 'js-cookie';
import { usePathname } from 'next/navigation';
import LoadingBar from 'react-top-loading-bar';

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

    const [progress, setProgress] = React.useState(0);
    const pathname = usePathname();

    // Detect pathname change
    React.useEffect(() => {
        const handleRouteChange = () => {
            setProgress(40); // Start progress when route change starts
        }

        handleRouteChange();

        // Detecting pathname changes (use pathname to access current route)
        const currentPath = pathname;

        // Setting progress to complete once pathname change is finished
        const interval = setInterval(() => {
            if (pathname !== currentPath) {
                setProgress(100); // Complete progress when pathname changes
                clearInterval(interval); // Stop the interval once the pathname change is detected
            }
        }, 100); // Check every 100ms for pathname changes

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [pathname]);

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
                    <LoadingBar
                        color="#000000"
                        progress={progress}
                        waitingTime={400}
                        onLoaderFinished={() => {
                            setProgress(0);
                        }}
                    />
                    <PageContainer>{props.children}</PageContainer>
                </DashboardLayout>
            </div>
        </AppProvider>
    );
}
