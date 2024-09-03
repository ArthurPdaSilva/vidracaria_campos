import { Backdrop, CircularProgress } from '@mui/material';

export interface LoaderProps {
  open: boolean;
}

export default function Loader({ open }: LoaderProps) {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
