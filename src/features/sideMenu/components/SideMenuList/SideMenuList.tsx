'use client';
import { constants } from '@/common';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

export const SideMenuList: React.FC = () => {
  const router = useRouter();
  return (
    <List sx={{ py: 0 }}>
      {constants.MENU_ITEMS.map(({ route, icon: Icon, text }) => (
        <ListItem
          key={route}
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 0,
            paddingTop: 0,
            marginTop: 0,
          }}
        >
          <ListItemButton
            onClick={() => router.push(route)}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Icon color='primary' sx={{ mx: 1 }} />
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
