import { Button } from '@mui/material';
import useGetIcons from '../../hooks/useGetIcons';

interface CloseButtonProps {
  onClose: () => void;
}

export default function CloseButton({ onClose }: CloseButtonProps) {
  const { ArrowBackIosIcon } = useGetIcons();

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
}
