import { NavigateNextIcon } from '@/assets/images/icons';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import useTranslate from '../../hooks/useTranslate';

export const GetLocationBreadcrumb = () => {
  const locationArr = window.location.pathname
    .split('/')
    .filter((location) => location.length > 0);
  const { translate } = useTranslate();

  if (locationArr.length > 2) {
    locationArr.pop();
  }

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{
        fontSize: '1rem',
        marginBottom: '2rem',
        marginTop: '3rem',
      }}
    >
      {locationArr.map((location, key) =>
        locationArr.length - 1 === key ? (
          <Typography
            key={key}
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
            color="black"
          >
            {translate(location)}
          </Typography>
        ) : (
          <Box key={key}>
            {location === 'edit' || location === 'add' ? (
              <Typography
                key={key}
                sx={{
                  fontSize: '1rem',
                }}
                color="grey"
              >
                {translate(location)}
              </Typography>
            ) : (
              <Link
                key={key}
                href={`/${location}`}
                underline="hover"
                color="grey"
              >
                {translate(location)}
              </Link>
            )}
          </Box>
        ),
      )}
    </Breadcrumbs>
  );
};
