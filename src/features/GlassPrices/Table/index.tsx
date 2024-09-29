import { TableCellActions } from '@/components/TableCellActions';

import { Box } from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import { GlassPrice } from '../types';

// TODO - Wesley, tira esses mocks e implemente a chamada de API
const useGetAllGlassPrices = () => {
  const [data, setData] = useState<GlassPrice[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    // Mock fetching data
    setTimeout(() => {
      setData([
        {
          id: '1',
          glassType: 'BOX_FUME',
          price: 100,
          constant: 1.2,
          sellerMargin: 0.3,
          millimeter: 5,
          category: 'DIVERSOS',
          userId: '1',
        },
        {
          id: '2',
          glassType: 'CANELADO',
          price: 150,
          constant: 1.5,
          sellerMargin: 0.4,
          millimeter: 6,
          category: 'DIVERSOS',
          userId: '1',
        },
      ]);
      setIsFetching(false);
    }, 1000);
  }, []);

  return { data, isFetching };
};

const useDeleteGlassPriceById = () => {
  const [isPending, setIsPending] = useState(false);

  const mutate = (id: string) => {
    setIsPending(true);
    // Mock deleting data
    setTimeout(() => {
      console.log(`Deleted glass price with id: ${id}`);
      setIsPending(false);
    }, 1000);
  };

  return { mutate, isPending };
};

export const Table = () => {
  const { data, isFetching } = useGetAllGlassPrices();

  const { mutate: deleteGlassPrice, isPending } = useDeleteGlassPriceById();

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
