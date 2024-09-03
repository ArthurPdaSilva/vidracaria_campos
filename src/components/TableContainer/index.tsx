import { Box, Typography } from '@mui/material';
import { ReactNode } from '@tanstack/react-router';
import { mainStyles } from '../../features/Dashboard/styles';
import { headerTablePageStyles } from '../../styles';

interface TableHeaderProps {
  title: string;
  rightActionComponent: ReactNode;
  table: ReactNode;
}

export default function TableContainer({
  rightActionComponent,
  table,
  title,
}: TableHeaderProps) {
  return (
    <Box sx={mainStyles} component={'main'}>
      <Box sx={{ ...headerTablePageStyles, flexWrap: 'wrap' }}>
        <Typography variant="h4" fontWeight={'bold'}>
          {title}
        </Typography>
        {rightActionComponent}
      </Box>
      {table}
    </Box>
  );
}
