import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/_layout/glassprice/add/')({
  component: () => <PricesForm />,
});

import { PageHeader } from '@/components/PageHeader';
import { SectionHeader } from '@/components/SectionHeader';
import { boxStyles, buttonStyles, formStyles } from '@/styles';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

const PricesForm = () => {
  // const {
  //   handleSubmit,
  //   control,
  //   setValue,
  //   watch,
  //   formState: { errors },
  // } = useForm<CreateServiceValidation>({
  //   resolver: yupResolver(CreateServiceSchema),
  //   defaultValues: {
  //     client: undefined,
  //     total: 0,
  //     products: [],
  //     status: 'ORCADO',
  //     images: [],
  //     discount: 0,
  //   },
  // });

  return (
    <Box sx={boxStyles}>
      <form style={formStyles}>
        <PageHeader title="Controle de preços" backTo="/home" />
        <SectionHeader label="Vidro comum" />
        <SectionHeader label="Vidro Temperado" />

        <LoadingButton
          id="btn-save"
          type="submit"
          variant="contained"
          sx={buttonStyles}
          // loading={create.isPending}
        >
          Salvar
        </LoadingButton>
      </form>
    </Box>
  );
};
