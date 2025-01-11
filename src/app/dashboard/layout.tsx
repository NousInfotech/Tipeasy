'use client'

import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { AppProvider } from '@toolpad/core/AppProvider';
import { createTheme } from '@mui/material';
import Cookie from 'js-cookie';
import { usePathname } from 'next/navigation';
import LoadingBar from 'react-top-loading-bar';
import { auth } from '@/config/firebase-client'; // Make sure to import your Firebase config
import { getIdToken } from 'firebase/auth';
import { generateNavigation } from '@/utils/constants';

type Role = 'superadmin' | 'admin' | 'waiter';

export default function DashboardPagesLayout(props: { children: React.ReactNode }) {
    const role = Cookie.get('userRole');
    const restaurantId = Cookie.get('restaurantId') || '';
    const theme = createTheme({
        palette: {
            primary: {
                main: '#98B03C',
            },
        },
    });

    const [progress, setProgress] = React.useState(0);
    const pathname = usePathname();

    React.useEffect(() => {
        const refreshTokenIfNeeded = async () => {
            const token = Cookie.get('authToken');
            const refreshToken = Cookie.get('refreshToken');

            if (token && refreshToken) {
                try {
                    // Refresh token logic: Force the token refresh from Firebase
                    const user = auth.currentUser;
                    if (user) {
                        const newToken = await getIdToken(user, true); // This forces a refresh
                        Cookie.set('authToken', newToken, { expires: 1 }); // Update the authToken cookie
                    }
                } catch (error) {
                    console.error("Error refreshing token:", error);
                }
            }
        };

        refreshTokenIfNeeded();

        const handleRouteChange = () => {
            setProgress(100); // Start progress when route change starts
        };

        // Detecting pathname changes (use pathname to access current route)
        const currentPath = pathname;

        // Setting progress to complete once pathname change is finished
        const interval = setInterval(() => {
            if (pathname !== currentPath) {
                handleRouteChange();
                clearInterval(interval); // Stop the interval once the pathname change is detected
            }
        }, 100); // Check every 100ms for pathname changes

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [pathname]);

    const NAVIGATION = generateNavigation(role as Role, restaurantId as string);

    return (
        <AppProvider navigation={NAVIGATION} branding={{
            logo: <div></div>,
            title: 'Tip Easyy',
        }}
            theme={theme}
        >
            <div>
                <DashboardLayout>
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
