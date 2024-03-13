'use client';
import { SxProps, TextField, Theme } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FormFieldProps {
  fieldKey: string;
  label: string;
  error: string | undefined;
  type?: string;
  sx?: SxProps<Theme>;
  autoFocus?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  fieldKey,
  error,
  label,
  type,
  autoFocus = false,
  sx = [],
}) => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        name={fieldKey}
        control={control}
        render={({ field }) => (
          <TextField
            margin='normal'
            fullWidth
            id={fieldKey}
            label={label}
            autoComplete='username'
            type={type}
            autoFocus={autoFocus}
            helperText={error}
            error={!!error}
            {...field}
          />
        )}
      />
    </>
  );
};
