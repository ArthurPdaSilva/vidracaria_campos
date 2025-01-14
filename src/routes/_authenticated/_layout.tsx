import { Menu } from '@/features/Menu';
import { Box } from '@mui/material';
import { Outlet, createFileRoute } from '@tanstack/react-router';

const LayoutComponent = () => {
  return (
    <Box display="flex" flexDirection="row" overflow="hidden">
      <Menu />
      <Outlet />
    </Box>
  );
};

export const Route = createFileRoute('/_authenticated/_layout')({
  component: LayoutComponent,
});
