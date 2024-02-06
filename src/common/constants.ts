import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { routesPath } from './routesPath';

export const constants = {
  MENU_ITEMS: [
    {
      icon: AccessTimeIcon,
      text: 'Time Tracker',
      route: routesPath.TIME_TRACKER,
    },
    {
      icon: LocalOfferOutlinedIcon,
      text: 'Теги',
      route: routesPath.TAGS,
    },
    {
      icon: AccessTimeIcon,
      text: 'test',
      route: '/test',
    },
  ],
};
