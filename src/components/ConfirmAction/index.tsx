import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import useGetIcons from '../../hooks/useGetIcons';
import { modalStyles } from '../../styles';

interface ConfirmActionProps {
  confirmDispach: () => void;
  denyDispach: () => void;
  open: boolean;
}

export default function ConfirmAction({
  confirmDispach,
  denyDispach,
  open,
}: ConfirmActionProps) {
  const { CloseIcon } = useGetIcons();
  return (
    <Modal open={open} onClose={denyDispach} sx={modalStyles}>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'fit-content'}
        padding={'1em'}
        flexDirection={'column'}
        borderRadius={'0.3em'}
        sx={{
          backgroundColor: '#fff',
        }}
      >
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={'100%'}
          borderBottom={'1px solid #ccc'}
        >
          <Typography variant="h6">Confirmação de ação</Typography>
          <IconButton onClick={denyDispach}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography
          variant="body1"
          sx={{
            marginTop: '1em',
            padding: '1em',
            borderRadius: '0.3em',
            backgroundColor: '#f5d9dd',
            color: 'red',
          }}
        >
          A ação de exclusão não poderá ser desfeita.
        </Typography>
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          width={'100%'}
          gap={'1em'}
          paddingTop={'1em'}
          sx={{
            borderTop: '1px solid #ccc',
          }}
        >
          <Button
            variant="text"
            onClick={denyDispach}
            sx={{ marginLeft: '1em' }}
            color="success"
          >
            Não
          </Button>
          <Button
            variant="contained"
            onClick={confirmDispach}
            sx={{ marginRight: '0.3em' }}
            color="error"
          >
            Sim
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
