import { Button } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { ArrowBackIosIcon } from '../../assets/images/icons';

interface ReturnButtonProps {
  link: string;
}

export const ReturnButton = ({ link }: ReturnButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      aria-label="Voltar"
      color="inherit"
      onClick={() => navigate({ to: link })}
      sx={{ color: '#000' }}
    >
      <ArrowBackIosIcon />
      Voltar
    </Button>
  );
};
