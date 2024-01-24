'use client';
import { constants } from '@/common';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

export const SideMenuItem: React.FC = () => {
  const router = useRouter();
  return (
    <>
      {constants.MENU_ITEMS.map(({ route, icon: Icon, text }) => (
        <ListItem key={route} sx={{ py: 0.5, px: 1.5 }}>
          <ListItemButton
            onClick={() => router.push(route)}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Icon color='primary' />
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
};
