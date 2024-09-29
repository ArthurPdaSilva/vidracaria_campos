import { TableCellActions } from '@/components/TableCellActions';

import { Box } from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useMemo } from 'react';
import { GlassPrice } from '../types';
import { useGetAllGlassPrice, useGetDeleteGlassPrice } from '../services';

export const Table = () => {
  const { data, isFetching } = useGetAllGlassPrice();

  const { mutate: deleteGlassPrice, isPending } = useGetDeleteGlassPrice();

  const columns = useMemo<MRT_ColumnDef<GlassPrice>[]>(
    () => [
      {
        accessorKey: 'glassType',
        header: 'Tipo de Vidro',
        enableHiding: true,
      },
      {
        accessorKey: 'price',
        header: 'Preço',
        enableHiding: true,
        Cell: (options) => {
          return <>R$ {options.row.original.price.toFixed(2)}</>;
        },
      },
      {
        accessorKey: 'constant',
        header: 'Constante',
        enableHiding: true,
      },
      {
        accessorKey: 'sellerMargin',
        header: 'Margem do Vendedor',
        enableHiding: true,
      },
      {
        accessorKey: 'millimeter',
        header: 'Milímetro',
        enableHiding: true,
      },
      {
        accessorKey: 'category',
        header: 'Categoria',
        enableHiding: true,
      },
      {
        accessorKey: 'actions',
        header: 'Ações',
        enableHiding: false,
        Cell: (options) => {
          return (
            <TableCellActions
              idObject={options.row.original.id as string}
              type="glassprice"
              dispach={handleDelete}
              handleClick={() => {}}
            />
          );
        },
      },
    ],
    [],
  );

  const handleDelete = (idItem: string) => {
    deleteGlassPrice(idItem);
  };

  const table = useMaterialReactTable({
    columns,
    data: data || [],
    enableColumnOrdering: true,
    enableGlobalFilter: true,
    enableDensityToggle: false,
    state: {
      isLoading: isFetching || isPending,
    },
  });

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <MaterialReactTable table={table} />
    </Box>
  );
};
