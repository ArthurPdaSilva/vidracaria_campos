import { Button } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import useGetIcons from '../../hooks/useGetIcons';

interface ReturnButtonProps {
  link: string;
}

export default function ReturnButton({ link }: ReturnButtonProps) {
  const { ArrowBackIosIcon } = useGetIcons();
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
}
