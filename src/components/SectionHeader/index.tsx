import { Box, Divider, Typography } from '@mui/material';

interface SectionHeaderProps {
  label: string;
}

function CustomDivider() {
  return (
    <Divider
      orientation="horizontal"
      sx={{
        flex: 1,
      }}
    />
  );
}

export default function SectionHeader({ label }: SectionHeaderProps) {
  return (
    <Box
      sx={{
        width: '100%',
        mt: 4,
        mb: 3,
        display: 'flex',
        gap: 3,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Typography component={'h1'} variant="h6">
        {label}
      </Typography>
      <CustomDivider />
    </Box>
  );
}
