import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { routesPath } from './routesPath';

export const constants = {
  MENU_ITEMS: [
    {
      icon: AccessTimeIcon,
      text: 'Трекери часу',
      route: routesPath.TIME_TRACKER,
    },
    {
      icon: ReceiptIcon,
      text: 'Проекти',
      route: routesPath.PROJECTS,
    },
    {
      icon: LocalOfferOutlinedIcon,
      text: 'Теги',
      route: routesPath.TAGS,
    },
    {
      icon: AccountCircleIcon,
      text: 'Клієнти',
      route: routesPath.CLIENTS,
    },
  ],
};
