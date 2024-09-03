import { Box } from '@mui/material';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import Menu from '../../features/Menu';

export const Route = createFileRoute('/_authenticated/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <Box display={'flex'} flexDirection={'row'} overflow={'hidden'}>
      <Menu />
      <Outlet />
    </Box>
  );
}
