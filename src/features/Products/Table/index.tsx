import TableCellActions from '@/components/TableCellActions';
import { Box } from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useMemo, useState } from 'react';
import ProducstInfoForm from '../ProductInfoForm';
import { useDeleteProductById, useGetAllProducts } from '../services';
import { ProductValidation } from '../types';

export default function Table() {
  const { data, isFetching } = useGetAllProducts();
  const { mutate: deleteProducts, isPending } = useDeleteProductById();
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrenProduct] = useState<
    ProductValidation | undefined
  >();

  const columns = useMemo<MRT_ColumnDef<ProductValidation>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nome',
        enableHiding: true,
      },
      {
        accessorKey: 'type',
        header: 'Variação',
        enableHiding: true,
        Cell: (options) => {
          return <>{options.row.original.type ?? '-'}</>;
        },
      },
      {
        accessorKey: 'unitOfMeasure',
        header: 'Unidade de Medida',
        enableHiding: true,
        Cell: (options) => {
          return <>{options.row.original.unitOfMeasure}</>;
        },
      },
      {
        accessorKey: 'category',
        header: 'Categoria',
        enableHiding: true,
        Cell: (options) => {
          return <>{options.row.original.category}</>;
        },
      },
      {
        header: 'Quantidade Atual',
        enableHiding: true,
        Cell: (options) => {
          return <>{options.row.original.actualQuantity ?? '-'}</>;
        },
      },
      {
        accessorKey: 'price',
        header: 'Preço',
        enableHiding: true,
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
            <TableCellActions
              idObject={options.row.original.id as string}
              type="product"
              dispach={handleDelete}
              handleClick={() => handleClick(options.row.original)}
            />
          );
        },
      },
    ],
    [],
  );

  const handleDelete = (id: string) => {
    deleteProducts(id);
  };

  const handleClick = (product: ProductValidation) => {
    setOpen(true);
    setCurrenProduct(product);
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
    state: {
      isLoading: isFetching || isPending,
    },
  });

  return (
    <>
      <ProducstInfoForm
        open={open}
        onClose={() => setOpen(false)}
        product={currentProduct}
      />
      <Box>
        <MaterialReactTable table={table} />
      </Box>
    </>
  );
}
