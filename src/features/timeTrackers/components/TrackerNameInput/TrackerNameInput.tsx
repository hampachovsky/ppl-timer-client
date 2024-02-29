'use client';
import { useDebounce } from '@/hooks';
import { updateTimer } from '@/services';
import { TextField } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';

type TrackerNameInputProps = {
  timerName?: string;
  timerId: string;
};

export const TrackerNameInput: React.FC<TrackerNameInputProps> = ({ timerName = '', timerId }) => {
  const [text, setText] = React.useState(timerName);
  const [isTouched, setIsTouched] = React.useState(false);
  const debouncedValue = useDebounce<string>(text, 700);

  useEffect(() => {
    if ((debouncedValue !== undefined || debouncedValue !== null) && isTouched) {
      const callUpdate = async () => {
        await updateTimer({ id: timerId, timerName: debouncedValue });
      };
      callUpdate();
      setIsTouched(false);
    }
  }, [debouncedValue]);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value);
    setIsTouched(true);
  };
  return (
    <TextField
      sx={{
        width: '90%',
        ml: '0.5em',
      }}
      variant='standard'
      value={text}
      onChange={handleTextChange}
      InputProps={{ disableUnderline: true }}
    />
  );
};
