import { clearToken } from '@/utils/tokens';
import { Box, Button, Drawer, IconButton } from '@mui/material/';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import queryClient from '../../config/queryClient';
import { useGetIcons } from '../../hooks/useGetIcons';
import LogoItem from './LogoItem';
import { MenuListItem } from './MenuListItem';
import {
  colapsableButtonMenu,
  exitStyles,
  headerStyles,
  navStyles,
} from './styles';

const MenuDesktop = () => {
  const navigate = useNavigate();
  const { LogoutOutlinedIcon, MenuOpenRoundedIcon } = useGetIcons();
  const [colapsedMenu, setColapsedMenu] = useState(false);

  const logout = () => {
    queryClient.clear();
    clearToken();
    navigate({ to: '/' });
  };

  return (
    <Box
      component={'header'}
      style={{ ...headerStyles, width: colapsedMenu ? '60px' : '200px' }}
    >
      <nav style={{ ...navStyles, width: colapsedMenu ? '60px' : '200px' }}>
        <section>
          <LogoItem colapsed={colapsedMenu} />
          <MenuListItem colapsed={colapsedMenu} />
          <Button
            onClick={() => setColapsedMenu(!colapsedMenu)}
            variant="text"
            sx={colapsableButtonMenu}
          >
            <MenuOpenRoundedIcon />
            {!colapsedMenu && 'Minimizar Menu'}
          </Button>
        </section>
        <Box sx={exitStyles}>
          <Button
            variant="text"
            startIcon={<LogoutOutlinedIcon />}
            sx={{
              fontSize: '1.2em',
              textTransform: 'capitalize',
            }}
            onClick={() => logout()}
          >
            {!colapsedMenu && 'Sair'}
          </Button>
        </Box>
      </nav>
    </Box>
  );
};

const MenuMobile = () => {
  const { MenuOutlinedIcon } = useGetIcons();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => setOpen(false), [router.latestLocation]);
  return (
    <>
      <Drawer open={open} onClose={() => setOpen(!open)}>
        <MenuDesktop />
      </Drawer>
      <Box
        sx={{
          position: 'fixed',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          height: '80px',
          zIndex: '999',
          borderBottom: '1px solid #ccc',
          backgroundColor: 'var(--background)',
        }}
      >
        <LogoItem colapsed={false} />
        <IconButton onClick={() => setOpen(!open)}>
          {!open && <MenuOutlinedIcon />}
        </IconButton>
      </Box>
    </>
  );
};

export const Menu = () => {
  return (
    <>
      <Box className="desktop">
        <MenuDesktop />
      </Box>
      <Box className="mobile">
        <MenuMobile />
      </Box>
    </>
  );
};
