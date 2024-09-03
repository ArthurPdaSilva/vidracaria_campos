import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Link, useRouterState } from '@tanstack/react-router';
import { memo } from 'react';
import {
  buttonStyle,
  buttonStyleActive,
  iconStyle,
  iconStyleActives,
  linkStyle,
  linkStyleActives,
} from '../../styles';

export interface MenuItemProps {
  label: string;
  path: string;
  colapsed: boolean;
  Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
}

function MenuItem(props: MenuItemProps) {
  const location = useRouterState().location;

  const verifyLinkActive = (link: string) => {
    return location.pathname === link
      ? {
          linkStyle: linkStyleActives,
          iconStyle: iconStyleActives,
          buttonStyle: buttonStyleActive,
        }
      : { linkStyle, iconStyle, buttonStyle };
  };

  return (
    <Link to={props.path} style={verifyLinkActive(props.path).linkStyle}>
      <ListItemButton
        key={props.label}
        LinkComponent={Link}
        sx={verifyLinkActive(props.path).buttonStyle}
      >
        <ListItemIcon>
          <props.Icon sx={verifyLinkActive(props.path).iconStyle} />
        </ListItemIcon>
        {!props.colapsed && <ListItemText primary={props.label} />}
      </ListItemButton>
    </Link>
  );
}

export default memo(MenuItem);
