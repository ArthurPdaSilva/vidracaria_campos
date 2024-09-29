import { ArrowBackIosIcon } from '@/assets/images/icons';
import { Button } from '@mui/material';

interface CloseButtonProps {
  onClose: () => void;
}

export const CloseButton = ({ onClose }: CloseButtonProps) => {
  return (
    <Button
      aria-label="Voltar"
      color="inherit"
      sx={{ color: '#000', fontSize: '1rem' }}
      onClick={onClose}
    >
      <ArrowBackIosIcon />
    </Button>
  );
};
