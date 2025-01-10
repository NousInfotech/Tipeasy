import { Role, RoleSegment } from '@/types/schematypes';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { BarChartIcon, BellIcon, CoinsIcon, CurrencyIcon, HomeIcon, HotelIcon, MenuIcon, QrCodeIcon, ReceiptIcon, UsersIcon } from 'lucide-react';



export const NAVIGATION_BY_ROLE: Record<Role, RoleSegment[]> = {
  superadmin: [
    { segment: 'dashboard/superadmin/', title: 'Dashboard', icon: <DashboardIcon /> },
    { segment: 'dashboard/superadmin/restaurants', title: 'Manage Restaurants', icon: <HotelIcon /> },
    { segment: 'dashboard/superadmin/qr-status', title: 'QR-based Status', icon: <QrCodeIcon /> },
    { segment: 'dashboard/superadmin/tippings', title: 'Tipping Management', icon: <CurrencyIcon /> },
    { segment: 'dashboard/superadmin/stats', title: 'Stats', icon: <BarChartIcon /> },
  ],
  admin: [
    { segment: 'dashboard/admin/{restaurantId}', title: 'Dashboard', icon: <DashboardIcon /> },
    { segment: 'dashboard/admin/{restaurantId}/waiters', title: 'Waiters Management', icon: <UsersIcon /> },
    { segment: 'dashboard/admin/{restaurantId}/qr-menu', title: 'QR Menu Management', icon: <MenuIcon /> },
    { segment: 'dashboard/admin/{restaurantId}/orders', title: 'Food Orders', icon: <ReceiptIcon /> },
    { segment: 'dashboard/admin/{restaurantId}/stats', title: 'Stats', icon: <BarChartIcon /> },
  ],

  waiter: [
    { segment: 'dashboard/waiter', title: 'Home Page', icon: <HomeIcon /> },
    { segment: 'dashboard/waiter/tippings', title: 'Tipping Management', icon: <CoinsIcon /> },
    { segment: 'dashboard/waiter/notifications', title: 'Notifications', icon: <BellIcon /> },

  ],
};

export function generateNavigation(role: Role, restaurantId?: string): RoleSegment[] {
  const navigation = NAVIGATION_BY_ROLE[role].map((item) => {
    const segment = item.segment.replace('{restaurantId}', restaurantId || '');
    return { ...item, segment }; // Replace placeholder with actual restaurantId
  });
  return navigation;
}

export const ERROR_CODES = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  SERVER_ERROR: "SERVER_ERROR",
  AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR",
};

export const ERROR_MESSAGES = {
  VALIDATION_ERROR: "The data provided is invalid.",
  NOT_FOUND: "The requested resource could not be found.",
  SERVER_ERROR: "An internal server error occurred.",
  AUTHENTICATION_ERROR: "Authentication failed.",
};



