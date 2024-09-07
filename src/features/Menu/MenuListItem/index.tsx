import useGetIcons from '@/hooks/useGetIcons';
import { List } from '@mui/material';
import { navListStyles } from '../styles';
import MenuItem from './MenuItem';

interface MenuListItemProps {
  colapsed: boolean;
}
export default function MenuListItem({ colapsed }: MenuListItemProps) {
  const {
    AccountCircleOutlinedIcon,
    BuildOutlinedIcon,
    DashboardOutlinedIcon,
    ShoppingCartOutlinedIcon,
  } = useGetIcons();

  const menuItems = [
    {
      Icon: DashboardOutlinedIcon,
      label: 'RELATÓRIOS',
      path: '/dashboard',
    },
    {
      Icon: AccountCircleOutlinedIcon,
      label: 'CLIENTES',
      path: '/customers',
    },
    {
      Icon: BuildOutlinedIcon,
      label: 'SERVIÇOS',
      path: '/services',
    },
    {
      Icon: ShoppingCartOutlinedIcon,
      label: 'PRODUTOS',
      path: '/products',
    },
  ];

  return (
    <List sx={navListStyles}>
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          colapsed={colapsed}
          Icon={item.Icon}
          label={item.label}
          path={item.path}
        />
      ))}
    </List>
  );
}
