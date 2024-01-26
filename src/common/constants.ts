import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { routesPath } from './routesPath';

export const constants = {
  MENU_ITEMS: [
    {
      icon: AccessTimeIcon,
      text: 'Time Tracker',
      route: routesPath.TIME_TRACKER,
    },
    {
      icon: AccessTimeIcon,
      text: 'test',
      route: '/test',
    },
  ],
};
