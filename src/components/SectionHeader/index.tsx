import { Box, Divider, Typography } from '@mui/material';

interface SectionHeaderProps {
  label: string;
  isSubsection?: boolean;
}

const CustomDivider = () => {
  return (
    <Divider
      orientation="horizontal"
      sx={{
        flex: 1,
      }}
    />
  );
};

export const SectionHeader = ({
  label,
  isSubsection = false,
}: SectionHeaderProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        mt: !isSubsection ? 4 : 0,
        mb: !isSubsection ? 3 : 0,
        display: 'flex',
        gap: 3,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Typography
        component={isSubsection ? 'h6' : 'h1'}
        variant={isSubsection ? 'subtitle2' : 'h6'}
      >
        {label}
      </Typography>
      <CustomDivider />
    </Box>
  );
};
