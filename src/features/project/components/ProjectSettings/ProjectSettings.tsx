'use client';
import { MenuSearchInput } from '@/components/ui';
import { useSearchMenuItems } from '@/hooks';
import { updateProject } from '@/services';
import { ClientData, ProjectData } from '@/types';
import {
  Alert,
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent } from 'react';
import { HexColorPicker } from 'react-colorful';

type ProjectSettingsProps = {
  id: string;
  projectName: string;
  projectColor: string;
  projectBillable: boolean;
  projectHourlyRate: number;
  client: ProjectData['client'];
  clients: ClientData[];
};

export const ProjectSettings: React.FC<ProjectSettingsProps> = ({
  id,
  projectName,
  projectColor,
  projectBillable,
  projectHourlyRate,
  client,
  clients,
}) => {
  const [name, setName] = React.useState(projectName);
  const [clientId, setClientId] = React.useState<string>(client ? client.id : 'none');
  const [billable, setBillable] = React.useState(projectBillable);
  const [hourlyRate, setHourlyRate] = React.useState(projectHourlyRate);
  const [color, setColor] = React.useState(projectColor);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const { handleSearchMenuItem, searchText } = useSearchMenuItems();

  const filteredClients = clients?.filter((client) =>
    client.clientName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleChangeClient = (event: SelectChangeEvent) => {
    setClientId(event.target.value);
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(event.target.value);
  };

  const handleChangeBillable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBillable(event.target.checked);
  };

  const handleChangeHourlyRate = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHourlyRate(+event.target.value);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleUpdateProjectName = async () => {
    if (name.length > 0 && name !== projectName) {
      const res = await updateProject({ projectName: name, id });
      if (res?.success) {
        setResponseMessage(res.success);
        setOpenSnackbar(true);
      }
    } else if (name.length <= 0) {
      setErrorMessage('Назва проекту повинна містити хоча б 1 літеру');
      setOpenSnackbar(true);
    }
  };

  const handleUpdateClient = async () => {
    const res = await updateProject({ clientId: +clientId, id });
    if (res?.success) {
      setResponseMessage(res.success);
      setOpenSnackbar(true);
    }
  };
  const handleUpdateProjectColor = async () => {
    if (color !== projectColor) {
      const res = await updateProject({ color, id });
      if (res?.success) {
        setResponseMessage(res.success);
        setOpenSnackbar(true);
      }
    }
  };
  const handleUpdateProjectBillable = async () => {
    if (billable !== projectBillable) {
      const res = await updateProject({ billable, id });
      if (res?.success) {
        setResponseMessage(res.success);
        setOpenSnackbar(true);
      }
    }
  };
  const handleUpdateHourlyRate = async () => {
    if (hourlyRate !== projectHourlyRate) {
      const res = await updateProject({ hourlyRate, id });
      if (res?.success) {
        setResponseMessage(res.success);
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 3, mb: 1 }}>
        <Typography sx={{ mb: 1 }} variant='h6'>
          Назва
        </Typography>
        <TextField
          autoFocus
          required
          margin='dense'
          id='projectName'
          name='projectName'
          label='Назва проекту'
          sx={{ width: '40%' }}
          variant='outlined'
          value={name}
          onChange={handleChangeName}
          onBlur={handleUpdateProjectName}
        />
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 3, mb: 1 }}>
        <Typography sx={{ mb: 1 }} variant='h6'>
          Клієнт
        </Typography>
        <Select
          variant='outlined'
          defaultValue={clientId ? clientId : 'none'}
          sx={{ width: '40%' }}
          onChange={handleChangeClient}
          onBlur={handleUpdateClient}
        >
          <MenuSearchInput handleSearch={handleSearchMenuItem} searchText={searchText} />
          <MenuItem value={'none'}>Без клієнту</MenuItem>
          {filteredClients?.map((client) => (
            <MenuItem key={client.id} value={client.id}>
              {client.clientName}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          pb: 3,
          mb: 1,
        }}
      >
        <Typography sx={{ mb: 1 }} variant='h6'>
          Кольор
        </Typography>
        <HexColorPicker
          style={{ width: '40%', marginTop: '0.7rem' }}
          color={color}
          onChange={setColor}
          onBlur={handleUpdateProjectColor}
        />
        <Typography sx={{ mt: '0.2em' }} align='left' variant={'h6'}>
          <Chip sx={{ backgroundColor: color, height: '20px', width: '20px', mr: '0.2em' }} />
          {color}
        </Typography>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 3, mb: 1 }}>
        <Typography sx={{ mb: 1 }} variant='h6'>
          Оплачується за замовчуванням
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onBlur={handleUpdateProjectBillable}
                onChange={handleChangeBillable}
                checked={billable}
              />
            }
            label='Так'
          />
        </FormGroup>
      </Box>
      <Box sx={{ pb: 3, mb: 1 }}>
        <Typography sx={{ mb: 1 }} variant='h6'>
          Оплата в годину (USD){' '}
        </Typography>
        <TextField
          required
          margin='dense'
          id='hourlyRate'
          name='hourlyRate'
          label='Оплата в годину (USD)'
          variant='outlined'
          type='number'
          value={hourlyRate}
          onChange={handleChangeHourlyRate}
          onBlur={handleUpdateHourlyRate}
        />
      </Box>
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={handleCloseSnackbar}
        open={openSnackbar}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={responseMessage ? 'success' : 'error'}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {responseMessage ? responseMessage : errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
