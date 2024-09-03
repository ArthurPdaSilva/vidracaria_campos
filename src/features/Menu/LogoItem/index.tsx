import { Grid, Typography } from '@mui/material';
import { memo } from 'react';
import logo from '../../../assets/images/logo-icon.webp';

interface LogoItemProps {
  colapsed: boolean;
}

function LogoItem({ colapsed }: LogoItemProps) {
  return (
    <Grid
      container
      alignItems={'center'}
      justifyContent={'center'}
      height={'80px'}
    >
      <Grid item>
        <img src={logo} alt="logo" style={{ maxWidth: '3em' }} loading="lazy" />
      </Grid>
      {!colapsed && (
        <Grid item>
          <Typography variant="h5" textAlign={'center'}>
            Campos
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default memo(LogoItem);
