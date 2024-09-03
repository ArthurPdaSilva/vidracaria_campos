import { Box, Typography } from '@mui/material';
import { cardStyles } from './styles';

interface cardChartProps {
  title: string;
  subtitle: string;
  imgPath: string;
  bgColor: string;
  fontColor: string;
}

export default function CardChart(props: cardChartProps) {
  return (
    <Box
      sx={{
        backgroundColor: props.bgColor,
        color: props.fontColor,
        ...cardStyles,
      }}
    >
      <img
        src={props.imgPath}
        alt={props.subtitle}
        style={{
          color: '#fff',
          width: '5em',
        }}
        loading="lazy"
      />
      <Box>
        <Typography variant="h5" fontWeight={'bold'} textAlign={'end'}>
          {props.title}
        </Typography>
        <Typography variant="caption" textAlign={'end'}>
          {props.subtitle}
        </Typography>
      </Box>
    </Box>
  );
}
