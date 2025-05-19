import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems: NavItemConfig[] = [
  {
    key: 'overview',
    title: 'Overview',
    href: paths.dashboard.overview,
    icon: 'chart-pie',
  },
  {
    key: 'main',
    title: 'Drivers',
    items: [
      {
        key: 'customers',
        title: 'All Drivers',
        href: paths.dashboard.customers,
        icon: 'users',
      },
      {
        key: 'integrations',
        title: 'Add Driver',
        href: paths.dashboard.integrations,
        icon: 'plugs-connected',
      },
    ],
  },
  {
    key: 'others',
    title: 'Others',
    items: [
      {
        key: 'settings',
        title: 'Settings',
        href: paths.dashboard.settings,
        icon: 'gear-six',
      },
      {
        key: 'account',
        title: 'Account',
        href: paths.dashboard.account,
        icon: 'user',
      },
      {
        key: 'error',
        title: 'Error',
        href: paths.errors.notFound,
        icon: 'x-square',
      },
    ],
  },
  {
    key: 'others',
    title: 'Others',
    items: [
      {
        key: 'settings',
        title: 'Settings',
        href: paths.dashboard.settings,
        icon: 'gear-six',
      },
      {
        key: 'account',
        title: 'Account',
        href: paths.dashboard.account,
        icon: 'user',
      },
      {
        key: 'error',
        title: 'Error',
        href: paths.errors.notFound,
        icon: 'x-square',
      },
    ],
  },
];
