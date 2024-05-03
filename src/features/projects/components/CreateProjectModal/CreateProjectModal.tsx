'use client';
import { MenuSearchInput } from '@/components/ui';
import { useSearchMenuItems } from '@/hooks';
import { createProject } from '@/services';
import { ClientData } from '@/types';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent } from 'react';
import { HexColorPicker } from 'react-colorful';

type CreateProjectModalProps = {
  clients: ClientData[];
};

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ clients }) => {
  const [open, setOpen] = React.useState(false);
  const [projectName, setProjectName] = React.useState('');
  const [clientId, setClientId] = React.useState<null | string>(null);
  const [color, setColor] = React.useState('#000000');

  const { handleSearchMenuItem, searchText } = useSearchMenuItems();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChangeProjectName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProjectName(event.target.value);
  };

  const filteredClients = clients.filter((client) =>
    client.clientName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleChangeColor = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setColor(event.target.value);
  };

  const handleChangeClient = (event: SelectChangeEvent) => {
    setClientId(event.target.value);
  };

  /*   const handleSubmit = async () => {
    const d = await createProject({ projectName, color, clientId });
    console.log(d);
    handleClose();
  }; */

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Button variant='contained' onClick={handleClickOpen}>
        Створити проект
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          component: 'form',
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const d = await createProject({ projectName, color, clientId });
            console.log(d);
            handleClose();
          },
        }}
      >
        <Box sx={{ backgroundColor: 'background.paper' }}>
          <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'customBG.list' }}>
            Створити новий проект
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ width: '50%' }}>
                <TextField
                  autoFocus
                  required
                  margin='dense'
                  id='projectName'
                  name='projectName'
                  label='Назва проекту'
                  type='text'
                  fullWidth
                  value={projectName}
                  onChange={handleChangeProjectName}
                  variant='outlined'
                />
              </Box>
              <Box sx={{ width: '40%' }}>
                <Select
                  variant='outlined'
                  defaultValue={'none'}
                  fullWidth
                  onChange={handleChangeClient}
                >
                  <MenuSearchInput handleSearch={handleSearchMenuItem} searchText={searchText} />
                  <MenuItem value={'none'}>Без клієнту</MenuItem>
                  {filteredClients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.clientName}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
            <Box>
              <HexColorPicker
                style={{ width: '100%', marginTop: '0.7rem' }}
                color={color}
                onChange={setColor}
              />
              <Typography sx={{ mt: '0.2em' }} align='center' variant={'h6'}>
                <Chip sx={{ backgroundColor: color, height: '20px', width: '20px', mr: '0.2em' }} />
                {color}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ borderTop: '1px solid', borderColor: 'customBG.list' }}>
            <Button onClick={handleClose}>Відмінити</Button>
            <Button variant='contained' type='submit'>
              Створити
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};
