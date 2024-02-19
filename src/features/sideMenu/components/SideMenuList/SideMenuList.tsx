'use client';
import { constants } from '@/common';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export const SideMenuList: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <List sx={{ py: 0 }}>
      {constants.MENU_ITEMS.map(({ route, icon: Icon, text }) => (
        <ListItem
          disablePadding
          key={route}
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 0,
            paddingTop: 0,
          }}
        >
          <ListItemButton
            onClick={() => router.push(route)}
            sx={{ display: 'flex', alignItems: 'center' }}
            selected={route === pathname}
          >
            <Icon color='primary' sx={{ mx: 1 }} />
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
