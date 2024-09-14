import { TableCellActions } from '@/components/TableCellActions';
import { Box } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useMemo } from 'react';
import {
  useDeleteServiceById,
  useGenerateBudgetPdf,
  useGetAllServices,
} from '../services';
import { ServiceValidationTable } from '../types';
import { converterStatus } from '../utils/converterStatus';

export const Table = () => {
  const navigate = useNavigate();
  const { data, isFetching } = useGetAllServices();
  const { mutate: deleteServices, isPending } = useDeleteServiceById();
  const { mutate: getPdf, isPending: isLoadingGeneratePdf } =
    useGenerateBudgetPdf();

  const handleClick = (id: string) => {
    navigate({ to: '/services/info/$id', params: { id } });
  };

  const columns = useMemo<MRT_ColumnDef<ServiceValidationTable>[]>(
    () => [
      {
        id: 'client',
        accessorKey: 'ownerName',
        header: 'Cliente',
        enableHiding: true,
      },
      {
        id: 'deliveryForecast',
        accessorKey: 'deliveryForecast',
        header: 'Previsão de Entrega',
        enableHiding: true,
        Cell: ({ row }) => (
          <>{row.original.deliveryForecast ?? 'Não informado'}</>
        ),
      },
      {
        id: 'total',
        accessorKey: 'total',
        header: 'Total',
        enableHiding: true,
        Cell: ({ row }) => (
          <>
            {row.original.total
              ? row.original.total.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              : 'Não informado'}
          </>
        ),
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        enableHiding: true,
        Cell: ({ row }) => <>{converterStatus(row.original.status)}</>,
      },
      {
        accessorKey: 'actions',
        header: 'Ações',
        enableHiding: false,
        Cell: ({ row }) => (
          <TableCellActions
            idObject={row.original.id as string}
            type="service"
            dispach={handleDelete}
            handleClick={handleClick}
            printBudgetClick={() =>
              row.original.id &&
              getPdf({
                clientName: row.original.ownerName as string,
                id: row.original.id,
              })
            }
          />
        ),
      },
    ],
    [],
  );

  const handleDelete = (id: string) => {
    deleteServices(id);
  };

  const table = useMaterialReactTable({
    columns,
    data: data ?? [],
    enableGlobalFilter: true,
    enableDensityToggle: false,
    muiTableContainerProps: {
      sx: {
        width: '100%',
      },
    },
    initialState: {
      sorting: [
        {
          id: 'deliveryForecast',
          desc: true,
        },
      ],
    },
    state: {
      isLoading: isFetching || isPending || isLoadingGeneratePdf,
    },
  });

  return (
    <Box>
      <MaterialReactTable table={table} />{' '}
    </Box>
  );
};
