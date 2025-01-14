import {
  AddOutlinedIcon,
  DeleteIcon,
  RemoveOutlinedIcon,
} from '@/assets/images/icons';
import { Box, IconButton } from '@mui/material';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';
import { useMemo } from 'react';
import { ProductInfo } from '../../types';

interface TableProductInfoProps {
  data: ProductInfo[];
  onIncrementDispatch: (id: string) => void;
  onDecrementDispatch: (id: string) => void;
  onDeleteDispatch: (id: string) => void;
  disableActions?: boolean;
}

export const TableProductInfo = ({
  data,
  onDecrementDispatch,
  onDeleteDispatch,
  onIncrementDispatch,
  disableActions = false,
}: TableProductInfoProps) => {
  const columns = useMemo<MRT_ColumnDef<ProductInfo>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Produto',
      },
      {
        accessorKey: 'glassType',
        header: 'Variante',
      },
      {
        accessorKey: 'actualQuantity',
        header: 'Quantidade',

        Cell: (options) => {
          return <>{options.row.original.actualQuantity}</>;
        },
      },
      {
        header: 'Dimensões A x L x P',
        Cell: (options) => {
          const item = options.row.original;
          if (!item.depth && !item.height && !item.width) {
            return '-';
          }
          return (
            <>
              {item.height} x {item.width} x {item.depth}
            </>
          );
        },
      },
      {
        accessorKey: 'price',
        header: 'Valor unitário',
        Cell: (options) => {
          return (
            <>
              {options.row.original.price
                ? options.row.original.price?.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                : 'Não informado'}
            </>
          );
        },
      },
      {
        accessorKey: 'actions',
        header: 'Ações',
        enableHiding: false,
        Cell: (options) => {
          return (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton
                disabled={disableActions}
                onClick={() =>
                  onIncrementDispatch(options.row.original.rowId as string)
                }
              >
                <AddOutlinedIcon />
              </IconButton>
              <IconButton
                disabled={disableActions}
                onClick={() =>
                  onDeleteDispatch(options.row.original.rowId as string)
                }
              >
                <DeleteIcon color="error" />
              </IconButton>
              <IconButton
                disabled={disableActions}
                onClick={() =>
                  onDecrementDispatch(options.row.original.rowId as string)
                }
              >
                <RemoveOutlinedIcon />
              </IconButton>
            </Box>
          );
        },
      },
    ],
    [],
  );

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
  });
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <MaterialReactTable table={table} />
    </Box>
  );
};
