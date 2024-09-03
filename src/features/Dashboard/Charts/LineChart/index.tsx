import { Box, Typography } from '@mui/material';
import {
  LineChart as LineChartImported,
  LineChartProps,
} from '@opd/g2plot-react';
import useMask from '../../../../hooks/useMask';

interface propsLineChart {
  data: { date: string; month: string; value: number }[];
  title: string;
}

export default function LineChart(props: propsLineChart) {
  const { realFormater } = useMask();
  const config: LineChartProps = {
    data: props.data,
    xField: 'date',
    yField: 'value',
    seriesField: 'value',
    autoFit: true,
    tooltip: {
      showTitle: true,
      fields: ['value'],
      formatter: (info) => ({
        name: 'Faturamento',
        value: realFormater.format(info.value),
      }),
      title: (info) =>
        `${info.split('-').reverse().join('/')} - ${props.data.find((data) => data.date === info)?.month}`,
    },
    yAxis: {
      grid: {
        line: {
          style: {
            lineWidth: 1,
          },
        },
      },
    },
    smooth: true,
    point: {
      shape: 'circle',
      size: 4,
      style: () => {
        return {
          fillOpacity: 1,
          stroke: 'transparent',
        };
      },
    },
    xAxis: {
      type: 'cat',
      animate: true,
      title: {
        text: 'Mês de faturamento',
      },
      label: {
        formatter: (date) =>
          props.data.find((data) => data.date === date)?.month,
        autoRotate: false,
      },
    },

    padding: 'auto',
    interactions: [
      { type: 'marker-active', enable: true },
      { type: 'brush', enable: true },
    ],
  };

  return (
    <Box
      borderRadius=".3em"
      padding={'1em'}
      boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
      flex={1}
      overflow={'hidden'}
    >
      <Typography variant="h6" textAlign={'center'}>
        {props.title}
      </Typography>
      <LineChartImported {...config} />
    </Box>
  );
}
