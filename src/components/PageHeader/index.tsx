import { Box, Typography } from '@mui/material';
import { headerFormStyles } from '../../styles';
import GetLocationBreadcrumb from '../GetLocationBreadcrumb';
import ReturnButton from '../ReturnButton';

interface PageHeaderProps {
  backTo: string;
  title: string;
}

export const PageHeader = ({ backTo, title }: PageHeaderProps) => {
  return (
    <>
      <GetLocationBreadcrumb />
      <Box style={headerFormStyles}>
        <ReturnButton link={backTo} />
        <Typography variant="h5" align="center">
          {title}
        </Typography>
      </Box>
    </>
  );
};
