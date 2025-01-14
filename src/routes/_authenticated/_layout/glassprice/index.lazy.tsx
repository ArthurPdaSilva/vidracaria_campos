import { AddButton } from '@/components/AddButton';
import { TableContainer } from '@/components/TableContainer';
import { Table } from '@/features/GlassPrices/Table';
import { createLazyFileRoute } from '@tanstack/react-router';

const GlassPrices = () => {
  return (
    <TableContainer
      rightActionComponent={<AddButton link="/glassprice/add" />}
      table={<Table />}
      title="Preços de Vidro"
    />
  );
};

export const Route = createLazyFileRoute('/_authenticated/_layout/glassprice/')(
  {
    component: GlassPrices,
  },
);
