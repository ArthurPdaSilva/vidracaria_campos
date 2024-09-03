import cartIcon from '@/assets/images/cart.webp';
import chartUpIcon from '@/assets/images/chart_up.webp';
import groupIcon from '@/assets/images/group.png';
import moneyIcon from '@/assets/images/money_icon.webp';
import Loader from '@/components/Loader';
import { CardChart, LineChart } from '@/features/Dashboard/Charts';
import { FinancialReportSchema } from '@/features/Dashboard/schemas';
import { useChartsCounters } from '@/features/Dashboard/services';
import { boxCards, mainStyles } from '@/features/Dashboard/styles';
import { FinancialReport } from '@/features/Dashboard/types';
import useMask from '@/hooks/useMask';
import { buttonStyles } from '@/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, FormControl, TextField, Typography } from '@mui/material';
import { createLazyFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

dayjs.extend(customParseFormat);

function Dashboard() {
  const { data, isFetching } = useChartsCounters();
  const { realFormater, arrDateToDate, addPercent } = useMask();

  const onSubmit: SubmitHandler<FinancialReport> = (data) => {
    console.log(data);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FinancialReport>({
    resolver: yupResolver(FinancialReportSchema),
    defaultValues: {
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().add(1, 'month').format('YYYY-MM-DD'),
    },
  });

  if (isFetching) return <Loader open />;

  return (
    <Box sx={mainStyles} component={'main'}>
      <Typography variant="h4" fontWeight={'bold'}>
        Relatórios
      </Typography>
      <Box sx={boxCards}>
        <CardChart
          fontColor="#fff"
          title={realFormater.format(data?.invoicing ?? 0)}
          subtitle="Faturamento Mês Atual"
          imgPath={moneyIcon}
          bgColor="#9650B9"
        />
        <CardChart
          fontColor="#fff"
          title={addPercent(data?.comparison ?? 0)}
          subtitle="Comparação com mês passado"
          imgPath={chartUpIcon}
          bgColor="#53AA6E"
        />
        <CardChart
          fontColor="#fff"
          title={String(data?.contractedServices ?? 0)}
          subtitle="Serviços contratados (esse mês)"
          imgPath={cartIcon}
          bgColor="#2196F3"
        />
        <CardChart
          fontColor="#fff"
          title={String(data?.newCustomers ?? 0)}
          subtitle="Clientes Novos (esse mês)"
          imgPath={groupIcon}
          bgColor="#EA5E0B"
        />
      </Box>
      <Box
        marginTop={5}
        display="flex"
        flexDirection="column"
        flex={1}
        gap={1}
        maxWidth="500px"
        borderRadius={'.5rem'}
      >
        <Typography variant="h6">Emitir relatório de faturamento</Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '.5rem',
            flexWrap: 'wrap',
            gap: '1em',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '1em',
              flexWrap: 'wrap',
            }}
          >
            <FormControl variant="outlined" sx={{ flex: 1 }}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="date"
                    id="date"
                    label="Início"
                    error={!!errors.startDate}
                    helperText={errors.startDate?.message}
                    {...field}
                    value={
                      field.value
                        ? dayjs(field.value, 'YYYY-MM-DD').format('YYYY-MM-DD')
                        : dayjs().format('YYYY-MM-DD')
                    }
                    sx={{
                      '& input': { height: '0px' },
                    }}
                    onChange={(e) => {
                      const formattedDate = dayjs(
                        e.target.value,
                        'YYYY-MM-DD',
                      ).format('YYYY-MM-DD');
                      field.onChange(formattedDate);
                    }}
                  />
                )}
              />
            </FormControl>
            <FormControl variant="outlined" sx={{ flex: 1 }}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="date"
                    id="date"
                    label="Fim"
                    error={!!errors.endDate}
                    helperText={errors.endDate?.message}
                    {...field}
                    value={
                      field.value
                        ? dayjs(field.value, 'YYYY-MM-DD').format('YYYY-MM-DD')
                        : dayjs().format('YYYY-MM-DD')
                    }
                    sx={{
                      '& input': { height: '0px' },
                    }}
                    onChange={(e) => {
                      const formattedDate = dayjs(
                        e.target.value,
                        'YYYY-MM-DD',
                      ).format('YYYY-MM-DD');
                      field.onChange(formattedDate);
                    }}
                  />
                )}
              />
            </FormControl>
          </Box>

          <LoadingButton
            id="btn-save"
            type="submit"
            variant="contained"
            sx={{ ...buttonStyles, height: '33px', flex: '1' }}
            loading={false}
          >
            Emitir
          </LoadingButton>
        </form>
      </Box>
      <Box display="flex" marginTop={1}>
        {data && (
          <LineChart
            data={data?.monthlyBillingDTOS.map((date) => {
              return {
                date: arrDateToDate(date.date),
                month: date.month,
                value: date.value,
              };
            })}
            title="Faturamento Mensal"
          />
        )}
      </Box>
    </Box>
  );
}

export const Route = createLazyFileRoute('/_authenticated/_layout/dashboard/')({
  component: Dashboard,
});
