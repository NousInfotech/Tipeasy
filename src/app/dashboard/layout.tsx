'use client'

import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { AppProvider } from '@toolpad/core/AppProvider';
import { NAVIGATION_BY_ROLE } from '@/utils/constants';
import Cookie from 'js-cookie';
import type { Metadata } from "next";



type Role = 'superadmin' | 'admin' | 'waiter';

export default function DashboardPagesLayout(props: { children: React.ReactNode }) {

    const role = Cookie.get('userRole');


    const NAVIGATION = NAVIGATION_BY_ROLE[role as Role];

    return (
        <AppProvider navigation={NAVIGATION}>
            <div>
                <DashboardLayout >
                    <PageContainer>{props.children}</PageContainer>
                </DashboardLayout>
            </div>
        </AppProvider>
    );
}
